<script>
import Products from "../../../data/products.json"
import { ref } from 'vue'

export default {
    name: 'Products',
    data (){
        return {
            productsData: Products,
            productQuantities: {},
            message: '',
            isMessageVisible: false,
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
        addToCart(product) {
            // Intenta recuperar el item del localStorage y lo convierte de JSON a un objeto de JavaScript.
            let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

            const qtyToAdd = product.qty || 1; // Asume que ya tienes la cantidad definida

            console.log("Cantidad: " + qtyToAdd)

            // Ya no es necesario verificar si cart es null o undefined aquí, porque ya lo manejamos arriba

            console.log("Cantidad en carrito: " + cart.length);

            const existingProductIndex = cart.findIndex(item => item.main_id === product.main_id);
            console.log(existingProductIndex);

            if (existingProductIndex !== -1) {
                // El producto ya existe, actualiza la cantidad y subtotal
                const newQty = cart[existingProductIndex].qty + qtyToAdd;
                if (newQty > 5) {
                    this.showMessage('No se pueden agregar más de 5 unidades');
                    return;
                }
                cart[existingProductIndex].qty = newQty;
                cart[existingProductIndex].subtotal = cart[existingProductIndex].cost * newQty;
            } else {
                // El producto no existe, agrega un nuevo producto al carrito
                if (qtyToAdd > 5) {
                    this.showMessage('No se pueden agregar más de 5 unidades');
                    return;
                }
                const productToAdd = {
                    id: product.main_id,
                    title: product.title,
                    price: product.cost,
                    qty: qtyToAdd,
                    subtotal: product.cost * qtyToAdd
                };
                cart.push(productToAdd);
            }

            // Guarda el carrito actualizado en localStorage
            localStorage.setItem('cartItems', JSON.stringify(cart));

            this.showMessage('Producto agregado al carrito');
            setTimeout(() => {
                //Recargar página
                window.location.reload();
            }, 3100)
        },
        showMessage(message) {
            this.message = message;
            this.isMessageVisible = true;

            setTimeout(() => {
                this.isMessageVisible = false;
            }, 3000); // El mensaje desaparece después de 3 segundos
        }
    }
}
</script>

<template>
    <div class="max-w-[85rem] px-4 py-14 sm:px-6 lg:px-8 lg:py-20 mx-auto">
        <h1 class="m-4 text-3xl text-center font-medium text-blue md:text-5xl">Nuestros Productos</h1>

        <div class="relative mx-auto grid max-w-screen px-2 pb-8 flex justify-center gap-8">  

            <div class="mt-2 grid gap-x-4 gap-y-3 md:grid-cols-2">

                <div v-for="productsData in productsData" :key="productsData.id" class="relative bg-white rounded-lg overflow-hidden shadow-lg p-4 sm:p-8">
                    <span class="text-xs font-semibold bg-green text-white py-1 px-3 rounded-md opacity-60 tracking-wide">Salud</span>
                    <img :src=productsData.imgURL :alt=productsData.title class="w-full h-48 sm:h-80 object-contain rounded-lg mt-2">
                    <h3 class="text-lg sm:text-2xl text-center font-medium mt-4">{{ productsData.title }}</h3>
                    <p class="text-gray-600 text-sm my-4 text-balanced">{{ productsData.details }}</p>

                    <div class="flex flex-col sm:flex-row justify-between items-center mt-4">
                        <span class="text-gray-800 text-lg font-medium">{{ formatCurrency(productsData.cost) }} COP</span>
                        <label for="qty" class="flex items-center text-sm mt-2 sm:mt-0">Cantidad:
                        <input id="qty" class="ml-2 w-16 border-gray-300 rounded-md border text-center" type="number" min="1" max="5" value="1" />
                        </label>
                        <button @click.prevent="addToCart(productsData)" class="w-full sm:w-fit rounded-lg bg-blueaccent px-4 py-2 text-xs sm:text-lg font-medium text-white transition hover:bg-orangeburn mt-4 sm:mt-0" >Agregar al Carrito</button>
                    </div>
                </div>

            </div>
            <!-- <p class="font-medium text-center">{{ message }}</p> -->
            <div name="fade" >
                <div v-if="isMessageVisible" class="fixed bottom-0 right-0 m-4 bg-green text-white p-4 rounded-lg">
                    {{ message }}
                    <a href="/cart" class="underline">Ver carrito</a>
                </div>
            </div>

        </div>
    </div>
</template>
<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        opacity: 0;
    }
    .message-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>