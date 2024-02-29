<script>
import Products from "../../../data/products.json"
import { ref } from 'vue'

export default {
    name: 'Products',
    data (){
        return {
            productsData: Products.data
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
        }
    }
}
</script>

<template>
    <div class="max-w-[85rem] px-4 py-14 sm:px-6 lg:px-8 lg:py-20 mx-auto">
        <h1 class="m-4 text-3xl text-center font-bold text-blue md:text-5xl">Nuestros Productos</h1>

        <div class="relative mx-auto grid max-w-screen px-2 pb-8 flex justify-center gap-8">  

            <div class="mt-2 grid gap-x-4 gap-y-3 md:grid-cols-2">

                <div v-for="productsData in productsData" :key="productsData.id" class="relative bg-white rounded-lg overflow-hidden shadow-lg p-4 sm:p-8">
                    <span class="text-xs font-semibold bg-green text-white py-1 px-3 rounded-md opacity-60 tracking-wide">Salud</span>
                    <img :src=productsData.attributes.imgURL :alt=productsData.attributes.title class="w-full h-48 sm:h-80 object-contain rounded-lg mt-2">
                    <h3 class="text-lg sm:text-2xl text-center font-bold mt-4">{{ productsData.attributes.title }}</h3>
                    <p class="text-gray-600 text-sm my-4 text-balanced">{{ productsData.attributes.details }}</p>

                    <div class="flex flex-col sm:flex-row justify-between items-center mt-4">
                        <span class="text-gray-800 text-lg font-bold">{{ formatCurrency(productsData.attributes.price) }}</span>
                        <label for="qty" class="flex items-center text-sm mt-2 sm:mt-0">Cantidad:
                        <input id="qty" class="ml-2 w-16 border-gray-300 rounded-md border text-center" type="number" min="1" max="5" value="1" />
                        </label>
                        <button class="w-full sm:w-fit rounded-lg bg-blueaccent px-4 py-2 text-xs sm:text-lg font-bold text-white transition hover:bg-orangeburn mt-4 sm:mt-0" >Agregar al Carrito</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>