<script>
import servicesData from '../../../data/services.json'
import { validateDateTimeAvialability, getHours, storeReservation } from '../../../assets/reservationLogic.js'
import { ref } from 'vue'
export default {
    name: 'ServiciosData',
    data(){
        return{
            servicesData : servicesData,
            selectedDate: ref(this.getCurrentDate()),
            selectedService: ref(null),
            selectedTime: ref(null),
            showTimeSelection: ref(false),
            message: ref('Trabajamos únicamente de Martes a Sábados'),
            availableHours: [],
            sendBtnMessage: ref('Reservar Ahora'),
        }
    },
    methods:{
        formatCurrency(value) {
            const formatter = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
            });
            return formatter.format(value);
        },
        getCurrentDate() {
            const now = new Date(new Date().toUTCString());
            const offset = 5 * 60 * 60000; // zona horaria de Colombia (UTC-5)
            const colombiaTime = new Date(now.getTime() - offset);

            const year = colombiaTime.getFullYear();
            const month = (colombiaTime.getMonth() + 1).toString().padStart(2, '0');
            const day = colombiaTime.getDate().toString().padStart(2, '0');

            return `${year}-${month}-${day}`;
        },
        async validateAvailability() {
            try {
                this.message = 'Validando disponibilidad...';
                let response = await validateDateTimeAvialability(this.selectedDate);

                if(response.status === 202){
                    console.log("Succesfully response")
                    this.message = response.message;
                    this.showTimeSelection = true;
                    console.log('The response: '+ JSON.stringify(response))
                    this.availableHours = await getHours(response.data, response.dayData)
                }else if(response.status === 406){
                    this.message = response.message;
                    this.showTimeSelection = false;
                }else if(response.status === 501){
                    this.message = response.message;
                    this.showTimeSelection = false;
                }
                else {
                    this.message = "Algo falló inesperadamente, vuelve a intentarlo";
                    this.showTimeSelection = false;
                }
            } catch (error) {
                    this.message = "Algo falló inesperadamente, vuelve a intentarlo más tarde";
                    this.showTimeSelection = false;
                }
        },
        async handleSubmit() {
            // Primero, verifica si se ha seleccionado un servicio
            if (!this.selectedService) {
                alert("Por favor, selecciona un servicio.");
                return;
            }
            // Luego, verifica si se ha seleccionado una fecha
            if (!this.selectedDate) {
                alert("Por favor, selecciona una fecha.");
                return;
            }
            // Finalmente, verifica si se ha seleccionado un horario
            if (!this.selectedTime) {
                alert("Por favor, selecciona un horario.");
                return;
            }
            // Si todo está seleccionado correctamente, procede con la lógica de envío
            
            this.sendBtnMessage = "Reservando Servicio...";

            console.log("Enviando formulario con:", {
                servicio: this.selectedService,
                fecha: this.selectedDate,
                horario: this.selectedTime
            });
            // Aquí iría el código para realmente enviar los datos, por ejemplo, una petición a una API

            await storeReservation( this.selectedDate, this.selectedTime, this.selectedService)
                .then(() => {
                    // Asumiendo que storeReservation es asíncrono y devuelve una promesa
                    this.sendBtnMessage = 'Servicio Reservado'
                    setTimeout(() => {
                        window.location.href = '/reservation';
                    }, 2000);
                })
                .catch(error => {
                    console.error('Hubo un error en la reserva:', error);
                    this.sendBtnMessage = "Error, intenta nuevamente";
                     // Espera 2 segundos (2000 milisegundos) y luego refresca la página
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                });
        }
    },
    computed: {
        minDate() {
            // Crear una fecha actual en UTC
            const now = new Date(new Date().toUTCString());
            
            // Ajustar a la zona horaria de Colombia (UTC-5)
            const offset = 5 * 60 * 60000; // Convertir 5 horas en milisegundos
            const colombiaTime = new Date(now.getTime() - offset);
            const year = colombiaTime.getFullYear();
            const month = (colombiaTime.getMonth() + 1).toString().padStart(2, '0'); // getMonth() es 0-index, sumar 1
            const day = colombiaTime.getDate().toString().padStart(2, '0');

            return `${year}-${month}-${day}`;
        }
    }

}
</script>
<template>

    <form @submit.prevent="" class="max-w-[85rem] px-4 py-14 sm:px-6 lg:px-8 lg:py-20 mx-auto">
        <div class="relative mx-auto mb-8 max-w-screen overflow-hidden rounded-xl bg-blue/60 py-12 text-center shadow-xl shadow-grayash">
            <h1 class="mt-2 px-8 text-3xl font-medium text-white md:text-5xl">Nuestros Servicios</h1>
            <p class="mt-6 text-lg text-white">Puedes reservar tu sesión ahora mismo</p>
            <p class="mx-2 text-pretty text-sm text-grayash">Selecciona el servicio que quieras, la fecha para validar disponibilidad y la hora que mejor se te ajuste</p>
            <img class="absolute top-0 left-0 -z-10 h-full w-full object-cover" src="https://cdn.pixabay.com/photo/2016/04/13/22/12/hands-1327811_1280.jpg" alt="Nuestros Servicios reserva ahora" />
        </div>

        <div class="mx-auto grid max-w-screen px-2 pb-8 flex justify-center gap-8">
            
            <div class="">
                <h3 class="text-xl font-medium text-blue">Selecciona un servicio:</h3>
                <div class="mt-2 grid gap-x-4 gap-y-3 md:grid-cols-2">
                    
                    <div v-for="servicesData in servicesData" :key="servicesData.main_id" class="relative w-full rounded-lg bg-white hover:bg-yellowburn">
                        <input class="peer hidden" :id="servicesData.slug" type="radio" name="service" v-model="selectedService" :value="servicesData.id" />
                        <label class="flex h-full cursor-pointer flex-col p-4 peer-checked:shadow-lg peer-checked:bg-bluewhite peer-checked:rounded-lg" :for="servicesData.slug">
                            <span class="mt-2 text-md text-blue font-medium">{{ servicesData.title }}</span>
                            <span class="text-xs text-grayblue">Duración: {{ servicesData.duration }} {{ servicesData.duration_type }}</span>
                            <span class="text-sm text-pretty pt-2">{{ servicesData.details }} </span>
                            <span class="test-xs uppercase text-right font-medium text-blueaccent pt-3">{{formatCurrency(servicesData.cost) }}</span>
                        </label>
                    </div>

                </div>
            </div>

            <div class="flex flex-col justify-center items-center gap-2 m-2 px-2">
                <p class="text-xl font-medium text-blue">Selecciona una Fecha:</p>
                <div class="relative m-2 w-64">
                    <input v-model="selectedDate" :min="minDate" @change="validateDate" type="date" class="datepicker-input block w-full rounded-lg border border-whiteblue bg-white p-2.5 px-3 outline-none ring-opacity-30 placeholder:text-gray focus:ring focus:ring-bluewhite sm:text-sm" required/>
                </div>
                <p class="text-sm text-grayblue text-center">{{ message }}</p>
                <button @click.prevent="validateAvailability()" class="rounded-md bg-yellowburn px-2 py-0.5 text-md font-medium text-white hover:text-white hover:bg-orangeburn">Validar disponibilidad</button>
                
            </div>

            <div v-if="showTimeSelection" class="flex flex-col justify-center items-center gap-4">
                <p class="m-2 text-xl font-medium text-blue">Selecciona una Hora:</p>
                <div class="w-full grid justify-items-center grid-cols-3 gap-2 lg:max-w-xl text-center">
                    <div v-for="hour in availableHours" :key="hour.id" class="relative w-full rounded-lg bg-white flex flex-center">
                        <!-- <input :id="hour.id" type="radio" name="time" class="peer sr-only" :disabled="!hour.available" /> -->
                        <input :id="hour.id" type="radio" name="time" class="peer sr-only" :disabled="!hour.available" v-model="selectedTime" :value="hour.id" />
                        <label :for="hour.id" class="relative w-full p-2 hover:bg-yellowburn hover:rounded-lg cursor-pointer peer-checked:shadow-lg peer-checked:font-medium peer-checked:bg-blue peer-checked:text-white peer-checked:rounded-lg peer-disabled:opacity-40 peer-disabled:bg-grayash">
                            {{ hour.time }}
                        </label>
                    </div>
                </div>
            </div>

            <input @click.prevent="handleSubmit()" type="submit" class="mx-auto w-full rounded-lg border-4 bg-blueaccent border-white px-8 py-4 text-lg font-medium text-white transition hover:bg-orangeburn" :value="sendBtnMessage"/>
        </div>
    </form>

</template>