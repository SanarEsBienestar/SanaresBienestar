import apiPetition from './apiPetition.js';
import availability from '../data/availability.json';
import { reservationStore } from '../store/reservation.store.js'
import { v4 as uuidv4 } from 'uuid';

export const validateDateTimeAvialability = async (date) => {
    //First extract the dates_off from the json
    const datesOff = availability.data.attributes.dates_off;
    //Validate if the date is date_off
    const isDateOff = datesOff.some(datesOff => datesOff === date);
    const newDate = new Date(date + 'T00:00:00'); // Usando la fecha sin especificar zona horaria
    const dayOfWeek = newDate.toLocaleString('en-US', { weekday: 'long', timeZone: 'America/Bogota' });
    const jsonDayWeek = availability.data.attributes.days_work.find(day => day.day === dayOfWeek);

    let JsonResponse = {
        message : '',
        data : '',
        status : '',
        dayData: ''
    }

    if (!jsonDayWeek || !jsonDayWeek.work_day) {
        console.log("The day is not work day");
        JsonResponse.status = 406;
        JsonResponse.message = "No es un día laboral, selecciona otra fecha";
        return JsonResponse;
    } else if(isDateOff === true) {
        console.log("The day is date off");
        JsonResponse.status = 406;
        JsonResponse.message = "El día seleccionado es NO está disponible, selecciona otra fecha";
        return JsonResponse;
    } else if (isDateOff === false) {
        //Build the endpoint for apiPetition
        const endpintQuery = `date-reservation?populate[date][filters][datetime][$contains]=${date}`;
        const response = await apiPetition('GET',endpintQuery);

        JsonResponse.dayData = jsonDayWeek
        JsonResponse.status = 202;
        JsonResponse.message = "Selecciona el horario de tu cita";
        JsonResponse.data = response.data.data.attributes.date;
        return JsonResponse;
    } else {
        JsonResponse.status = 502;
        JsonResponse.message = "Un error ha ocurrido";
        return JsonResponse;
    }  
};

export const getHours = async (dateData, dayData) => {
    const startTime = parseInt(dayData.hour_init.split(":")[0], 10);
    const endTime = parseInt(dayData.hour_finish.split(":")[0], 10);

    let hours = [];
    for (let hour = startTime; hour <= endTime; hour++) {
        // Formato de 24 horas para el ID
        const hour24 = `${hour.toString().padStart(2, '0')}:00`;
        // Formato de 12 horas para mostrar al usuario
        const hour12 = `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 || hour === 24 ? 'AM' : 'PM'}`;
        
        let available = true;
        // Comprobar la disponibilidad contra dateData
        dateData.forEach(slot => {
            const slotHour = new Date(slot.datetime).getHours();
            if (slotHour === hour) {
                available = false;
            }
        });

        hours.push({ id: hour24, time: hour12, available });
    }
    
    return hours;
}

export const storeReservation = async (date, time, serviceId) => {
    try {
        //Transform date and time to datetime type
        // const dateTime = new Date(`${date}T${time}:00.000Z`);
        const dateTime = `${date}T${time}:00.000Z`;
        const serviceUUID = uuidv4();

        const dataReservation =
            {serviceUUID : serviceUUID,
                details : {
                    datetime: dateTime,
                    service_id: serviceId
                }
            }

        // Intenta cargar datos existentes desde localStorage
        let reservationStore = JSON.parse(localStorage.getItem('reservationData'));
        // Verifica si reservationStore ya contiene datos
        if (!reservationStore) {
            // Si no hay datos previos, inicializa un nuevo array
            reservationStore = [];
        }

        reservationStore.push(dataReservation);

        localStorage.setItem('reservationData', JSON.stringify(reservationStore));

        console.log(reservationStore);

    } catch{
        console.log("Error al guardar la reserva");
        return console.error('error');
    }
}