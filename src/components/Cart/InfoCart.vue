<script>
    import { ref, onMounted } from 'vue';
    import Services from "../../../data/services.json";

    
export default {
  setup() {
    // Crear una referencia reactiva para almacenar las reservaciones
    const reservations = ref([]);

    // Crear una propiedad reactiva para verificar si hay datos
    const isData = ref(false);

    // Mensaje botón dinámico
    const buttonText = ref('No hay Nada Reservado');

    const checkStorage = () => {
        const isDataReservation = localStorage.getItem('reservationData');
        const reservationsArray = JSON.parse(isDataReservation);

        if(!isDataReservation ){
            return isData.value = false;
        } else if (reservationsArray.length === 0){
            return isData.value = false;
        } else if (reservationsArray.length > 0){
            buttonText.value = "Confirmar Reserva";
            return isData.value = true;
        } else {
            return isData.value = false;
        }
    }

    const removeReservation = (serviceUUID) => {
        // Actualizar el array de reservaciones eliminando el registro con el UUID dado
        reservations.value = reservations.value.filter(reservation => reservation.serviceUUID !== serviceUUID);
    
        // Actualizar localStorage si es necesario
        localStorage.setItem('reservationData', JSON.stringify(reservations.value));
        // Reload page
        window.location.reload();
    };

    // Método para cargar las reservaciones
    const loadReservations = () => {
      const storedReservations = localStorage.getItem('reservationData');
      if (storedReservations) {
        isData.value = true;
        const rawReservations = JSON.parse(storedReservations);
        reservations.value = rawReservations.map(reservation => {
          const serviceDetails = getServiceDetails(reservation.details.service_id);
          return {
            ...reservation,
            formattedDate: reservation.details.datetime.split('T')[0],
            formattedTime: reservation.details.datetime.split('T')[1].substring(0, 5),
            serviceTitle: serviceDetails.attributes.title,
            serviceCost: serviceDetails.attributes.cost,
            serviceDuration: `${serviceDetails.attributes.duration} ${serviceDetails.attributes.durationtype}`,
            serviceDetails: serviceDetails.attributes.details,
          };
        });
      }
    };

    // Método para obtener los detalles del servicio
    const getServiceDetails = (serviceId) => {
      return Services.data.find(service => service.id === serviceId);
    };

    // Método formateo costos
    const formatCurrency = (value) => {
        const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        });
        return formatter.format(value);
    };

    // Métpdp fprmateo hora reserva
    const formatTimeHour = (hour) =>{
        const [hourStr, minStr] = hour.split(':');
        let hourInt = parseInt(hourStr, 10);
        const period = hourInt < 12 ? 'AM' : 'PM';

        if(hourInt > 12){
            hourInt -= 12;
        } else if(hourInt === 0){
            hourInt = 12;
        }

        const hourFormatted = hourInt.toString().padStart(2, '0');
        const minFormatted = minStr.padStart(2, '0');

        return `${hourFormatted}:${minFormatted} ${period}`;
    }

    // Hook onMounted para cargar las reservaciones cuando el componente se monta
    onMounted(() => {
      checkStorage();
      loadReservations();
    });

    // Exponer las propiedades reactivas y métodos al template
    return {
      reservations,
      isData,
      buttonText,
      formatCurrency,
      formatTimeHour,
      loadReservations,
      getServiceDetails,
      removeReservation,
      checkStorage
    };
  }
}

</script>

<template>
    <div class="max-w-[85rem] px-4 py-14 sm:px-6 lg:px-8 lg:py-20 mx-auto h-max">

        <div class="w-full flex flex-col justify-center content-center" v-if="isData">
            
            <div class="flex flex-col flex-wrap gap-4 justify-center mt-4">

                <h2 class="m-2 px-8 text-center text-3xl font-bold text-blue text-balanced">Detalles del servicio a Reservar</h2>

                <div class="flex justify-center flex-wrap gap-1 overflow-x-auto md:flex-row flex-col">

                    <div class="w-auto" v-for="reservation in reservations" :key="reservation.serviceUUID">
                        
                        <dl class="w-auto h-full divide-y divide-grayblue text-sm max-w-lg rounded-lg border border-grayblue py-3 shadow-sm">

                            <div class="flex justify-end m-2 -mt-1">
                                <button class="bg-red hover:bg-orangeburn text-white text-xs font-bold py-1 px-2 rounded tooltip" @click="removeReservation(reservation.serviceUUID)">
                                    X
                                </button>
                            </div>

                            <div class="grid grid-cols-1 gap-1 p-3 even:bg-white sm:grid-cols-3 sm:gap-4">
                                <dt class="font-medium md:text-right w-full md:w-24 text-center text-black">UUID:</dt>
                                <dd class="text-gray md:text-left text-center sm:col-span-2">{{ reservation.serviceUUID }}</dd>
                            </div>

                            <div class="grid grid-cols-1 gap-1 p-3 even:bg-white sm:grid-cols-3 sm:gap-4">
                                <dt class="font-medium md:text-right w-full md:w-24 text-center text-black">Servicio:</dt>
                                <dd class="text-gray md:text-left text-center sm:col-span-2">{{ reservation.serviceTitle }}</dd>
                            </div>

                            <div class="grid grid-cols-1 gap-1 p-3 even:bg-white sm:grid-cols-3 sm:gap-4">
                                <dt class="font-medium md:text-right w-full md:w-24 text-center text-black">Duración:</dt>
                                <dd class="text-gray md:text-left text-center sm:col-span-2">{{ reservation.serviceDuration }}</dd>
                            </div>

                            <div class="grid grid-cols-1 gap-1 p-3 even:bg-white sm:grid-cols-3 sm:gap-4">
                                <dt class="font-medium md:text-right w-full md:w-24 text-center text-black">Fecha:</dt>
                                <dd class="text-gray md:text-left text-center sm:col-span-2">{{ reservation.formattedDate }}</dd>
                            </div>

                            <div class="grid grid-cols-1 gap-1 p-3 even:bg-white sm:grid-cols-3 sm:gap-4">
                                <dt class="font-medium md:text-right w-full md:w-24 text-center text-black">Hora:</dt>
                                <dd class="text-gray md:text-left text-center sm:col-span-2">{{ formatTimeHour(reservation.formattedTime) }}</dd>
                            </div>

                            <div class="grid grid-cols-1 gap-1 p-3 even:bg-white sm:grid-cols-3 sm:gap-4">
                                <dt class="font-medium md:text-right w-full md:w-24 text-center text-black">Costo:</dt>
                                <dd class="text-gray md:text-left text-center sm:col-span-2">{{ formatCurrency(reservation.serviceCost)}}</dd>
                            </div>

                            <div class="grid grid-cols-1 gap-1 p-3 even:bg-white sm:grid-cols-3 sm:gap-4">
                                <dt class="font-medium md:text-right w-full md:w-24 text-center text-black">Descripción:</dt>
                                <dd class="text-gray md:text-left text-center sm:col-span-2 text-balanced">{{ reservation.serviceDetails }}</dd>
                            </div>

                        </dl>
                    </div>

                    
                </div>
                
                <div class="flex justify-center items-center h-fit">
                    <a href="/services" class="rounded-md max-w-80 bg-yellowburn text-center py-2 px-6 text-lg font-medium text-white hover:text-white hover:bg-orangeburn">
                        Agregar otro Servicio
                    </a>
                </div>


                <form @submit.prevent="" class="space-y-4 w-full bg-bluewhite p-4 rounded-lg">

                    <h2 class="m-2 px-8 text-center text-3xl font-bold text-blue text-balanced">Datos para la Reserva</h2>
                    <div>
                        <label class="sr-only" for="name">Nombre</label>
                        <input
                        class="w-full rounded-lg border-gray p-3 text-sm"
                        placeholder="Nombre"
                        type="text"
                        id="name"
                        required
                        />
                    </div>

                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                        <label class="sr-only" for="email">Correp</label>
                        <input
                            class="w-full rounded-lg border-gray p-3 text-sm"
                            placeholder="Correo"
                            type="email"
                            id="email"
                            required
                        />
                        </div>

                        <div>
                        <label class="sr-only" for="phone">Celular</label>
                        <input
                            class="w-full rounded-lg border-gray p-3 text-sm"
                            placeholder="Celular o Télefono"
                            type="tel"
                            id="phone"
                            required
                        />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                        <div>
                        <label
                            for="Option1"
                            class="block w-full cursor-pointer rounded-lg border border-blue p-3 text-blue font-bold hover:border-orangeburn has-[:checked]:border-blue has-[:checked]:bg-blue has-[:checked]:text-white"
                            tabindex="0"
                        >
                            <input class="sr-only" id="Option1" type="radio" tabindex="-1" name="option" />

                            <span class="text-sm"> Pago con Tarjeta </span>
                        </label>
                        </div>

                        <div>
                        <label
                            for="Option2"
                            class="block w-full cursor-pointer rounded-lg border border-blue p-3 text-blue font-bold hover:border-orangeburn has-[:checked]:border-blue has-[:checked]:bg-blue has-[:checked]:text-white"
                            tabindex="0"
                        >
                            <input class="sr-only" id="Option2" type="radio" tabindex="-1" name="option" />

                            <span class="text-sm"> Billetera Digital </span>
                        </label>
                        </div>

                        <div>
                        <label
                            for="Option3"
                            class="block w-full cursor-pointer rounded-lg border border-blue p-3 text-blue font-bold hover:border-orangeburn has-[:checked]:border-blue has-[:checked]:bg-blue has-[:checked]:text-white"
                            tabindex="0"
                        >
                            <input class="sr-only" id="Option3" type="radio" tabindex="-1" name="option" />

                            <span class="text-sm"> Efectivo </span>
                        </label>
                        </div>

                        <div>
                        <label
                            for="Option4"
                            class="block w-full cursor-pointer rounded-lg border border-blue p-3 text-blue font-bold hover:border-orangeburn has-[:checked]:border-blue has-[:checked]:bg-blue has-[:checked]:text-white"
                            tabindex="0"
                        >
                            <input class="sr-only" id="Option4" type="radio" tabindex="-1" name="option" />

                            <span class="text-sm"> Transferencia Banco </span>
                        </label>
                        </div>

                        <div>
                        <label
                            for="Option5"
                            class="block w-full cursor-pointer rounded-lg border border-blue p-3 text-blue font-bold hover:border-orangeburn has-[:checked]:border-blue has-[:checked]:bg-blue has-[:checked]:text-white"
                            tabindex="0"
                        >
                            <input class="sr-only" id="Option5" type="radio" tabindex="-1" name="option" />

                            <span class="text-sm"> Pago Consultorio </span>
                        </label>
                        </div>
                    </div>

                    <div class="mt-4 flex align-center">
                        <input
                        type="submit"
                        class="mx-auto w-full rounded-lg border-2 bg-blueaccent border-white px-8 py-4 text-lg font-bold text-white transition hover:bg-orangeburn"
                        :value=buttonText
                        />
                    </div>
                </form>
            </div>
        </div>
        <div v-else class="relative flex flex-col items-center justify-center gap-4 h-auto min-h-96">
            <p class="m-2 text-center text-xl font-bold text-blue">No hay reservaciones. Puedes ver los servicios que tenemos:</p>
            <a href="/services" class="rounded-md bg-yellowburn h-fit py-2 px-6 text-lg font-medium text-white hover:text-white hover:bg-orangeburn">Ver Servicios</a>
        </div>
        </div>
</template>
