<script>
    import { ref, onMounted } from 'vue';

    
export default {
  setup() {
    // Crear una referencia reactiva para almacenar las reservaciones
    const itemsCart = ref([]);

    // Crear una propiedad reactiva para verificar si hay datos
    const isData = ref(false);

    // Mensaje botón dinámico
    const buttonText = ref('No hay nada en el Carrito de compras');

    const checkStorage = () => {
        const isDataCart = localStorage.getItem('cartItems');
        const cartArray = JSON.parse(isDataCart);

        if(!isDataCart ){
            return isData.value = false;
        } else if (cartArray.length === 0){
            return isData.value = false;
        } else if (cartArray.length > 0){
            buttonText.value = "Confirmar Compra";
            return isData.value = true;
        } else {
            return isData.value = false;
        }
    }

    const removeCartItem = (itemID) => {
        // Actualizar el array de reservaciones eliminando el registro con el UUID dado
        itemsCart.value = itemsCart.value.filter(item => item.id !== itemID);
    
        // Actualizar localStorage si es necesario
        localStorage.setItem('cartItems', JSON.stringify(itemsCart.value));
        // Reload page
        window.location.reload();
    };

    // Método para cargar las reservaciones
    const loadCartItems = () => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            isData.value = true; // Asume que este valor se usa para indicar si hay datos.
            const rawCart = JSON.parse(storedCartItems);
            itemsCart.value = rawCart; // Asigna directamente los objetos parseados.
        } else {
            // Es importante manejar el caso en que no hay datos.
            // Puedes establecer isData.value en false o asignar un valor por defecto a itemsCart.value aquí.
            isData.value = false;
            itemsCart.value = []; // Asegúrate de que itemsCart tenga un valor predeterminado adecuado.
        }
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

    // Hook onMounted para cargar las reservaciones cuando el componente se monta
    onMounted(() => {
      checkStorage();
      loadCartItems();
    });

    // Exponer las propiedades reactivas y métodos al template
    return {
      itemsCart,
      isData,
      buttonText,
      formatCurrency,
      loadCartItems,
      removeCartItem,
      checkStorage
    };
  }
}

</script>

<template>
    <div class="max-w-[85rem] px-4 py-14 sm:px-6 lg:px-8 lg:py-20 mx-auto h-max">

        <div class="w-full flex flex-col justify-center content-center" v-if="isData">
            
            <div class="flex flex-col flex-wrap gap-4 justify-center mt-4">

                <h2 class="m-2 px-8 text-center text-3xl font-medium text-blue text-balanced">Detalles de Productos Seleccionados</h2>

                <div class="flex justify-center flex-wrap gap-1 overflow-x-auto md:flex-row flex-col">

                    <div v-for="item in itemsCart" :key="item.id" class="w-auto">
                        
                        <dl class="w-auto h-full divide-y divide-grayblue text-sm max-w-lg rounded-lg border border-grayblue py-3 shadow-sm">

                            <div class="flex justify-end m-2 -mt-1">
                                <button class="bg-red hover:bg-orangeburn text-white text-xs font-medium py-1 px-2 rounded tooltip" @click="removeCartItem(item.id)">
                                    X
                                </button>
                            </div>

                            <div class="grid grid-cols-1 gap-1 p-3 even:bg-white sm:grid-cols-3 sm:gap-4">
                                <dt class="font-medium md:text-right w-full md:w-24 text-center text-black">ID:</dt>
                                <dd class="text-gray md:text-left text-center sm:col-span-2">{{ item.id }}</dd>
                            </div>

                            <div class="grid grid-cols-1 gap-1 p-3 even:bg-white sm:grid-cols-3 sm:gap-4">
                                <dt class="font-medium md:text-right w-full md:w-24 text-center text-black">Producto:</dt>
                                <dd class="text-gray md:text-left text-center sm:col-span-2">{{ item.title }}</dd>
                            </div>

                            <div class="grid grid-cols-1 gap-1 p-3 even:bg-white sm:grid-cols-3 sm:gap-4">
                                <dt class="font-medium md:text-right w-full md:w-24 text-center text-black">Cantidad:</dt>
                                <dd class="text-gray md:text-left text-center sm:col-span-2">{{ item.qty }}</dd>
                            </div>

                            <div class="grid grid-cols-1 gap-1 p-3 even:bg-white sm:grid-cols-3 sm:gap-4">
                                <dt class="font-medium md:text-right w-full md:w-24 text-center text-black">Precio Unidad:</dt>
                                <dd class="text-gray md:text-left text-center sm:col-span-2">{{ formatCurrency(item.price) }}</dd>
                            </div>

                            <div class="grid grid-cols-1 gap-1 p-3 even:bg-white sm:grid-cols-3 sm:gap-4">
                                <dt class="font-medium md:text-right w-full md:w-24 text-center text-black">Subtotal:</dt>
                                <dd class="text-gray md:text-left text-center sm:col-span-2">{{ formatCurrency(item.subtotal) }}</dd>
                            </div>

                        </dl>
                    </div>

                    
                </div>
                
                <div class="flex justify-center items-center h-fit">
                    <a href="/shop" class="rounded-md max-w-80 bg-yellowburn text-center py-2 px-6 text-lg font-medium text-white hover:text-white hover:bg-orangeburn">
                        Agregar otro Producto
                    </a>
                </div>


                <form @submit.prevent="" class="space-y-4 w-full bg-bluewhite p-4 rounded-lg">

                    <h2 class="m-2 px-8 text-center text-3xl font-medium text-blue text-balanced">Datos para la Compra</h2>
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

                    <div>
                        <label class="sr-only" for="address">Dirección Entrega</label>
                        <input
                        class="w-full rounded-lg border-gray p-3 text-sm"
                        placeholder="Dirección Entrega"
                        type="text"
                        id="address"
                        required
                        />
                        <p class="text-sm mt-1 text-center text-gray">Envíos únicamente en Bogotá</p>
                    </div>

                    <div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                        <div>
                        <label
                            for="Option1"
                            class="block w-full cursor-pointer rounded-lg border border-blue p-3 text-blue font-medium hover:border-orangeburn has-[:checked]:border-blue has-[:checked]:bg-blue has-[:checked]:text-white"
                            tabindex="0"
                        >
                            <input class="sr-only" id="Option1" type="radio" tabindex="-1" name="option" />

                            <span class="text-sm"> Pago con Tarjeta </span>
                        </label>
                        </div>

                        <div>
                        <label
                            for="Option2"
                            class="block w-full cursor-pointer rounded-lg border border-blue p-3 text-blue font-medium hover:border-orangeburn has-[:checked]:border-blue has-[:checked]:bg-blue has-[:checked]:text-white"
                            tabindex="0"
                        >
                            <input class="sr-only" id="Option2" type="radio" tabindex="-1" name="option" />

                            <span class="text-sm"> Billetera Digital </span>
                        </label>
                        </div>

                        <div>
                        <label
                            for="Option3"
                            class="block w-full cursor-pointer rounded-lg border border-blue p-3 text-blue font-medium hover:border-orangeburn has-[:checked]:border-blue has-[:checked]:bg-blue has-[:checked]:text-white"
                            tabindex="0"
                        >
                            <input class="sr-only" id="Option3" type="radio" tabindex="-1" name="option" />

                            <span class="text-sm"> Efectivo </span>
                        </label>
                        </div>

                        <div>
                        <label
                            for="Option4"
                            class="block w-full cursor-pointer rounded-lg border border-blue p-3 text-blue font-medium hover:border-orangeburn has-[:checked]:border-blue has-[:checked]:bg-blue has-[:checked]:text-white"
                            tabindex="0"
                        >
                            <input class="sr-only" id="Option4" type="radio" tabindex="-1" name="option" />

                            <span class="text-sm"> Transferencia Banco </span>
                        </label>
                        </div>

                        <div>
                        <label
                            for="Option5"
                            class="block w-full cursor-pointer rounded-lg border border-blue p-3 text-blue font-medium hover:border-orangeburn has-[:checked]:border-blue has-[:checked]:bg-blue has-[:checked]:text-white"
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
                        class="mx-auto w-full rounded-lg border-2 bg-blueaccent border-white px-8 py-4 text-lg font-medium text-white transition hover:bg-orangeburn"
                        :value=buttonText
                        />
                    </div>
                </form>
            </div>
        </div>
        <div v-else class="relative flex flex-col items-center justify-center gap-4 h-auto min-h-96">
            <p class="m-2 text-center text-xl font-medium text-blue">No hay productos agregados. Puedes ver lo que tenemos para ti:</p>
            <a href="/shop" class="rounded-md bg-yellowburn h-fit py-2 px-6 text-lg font-medium text-white hover:text-white hover:bg-orangeburn">Ver Productos</a>
        </div>
        </div>
</template>
<style scoped>
.tooltip {
            position: relative;
        }

        .tooltip::after {
            content: 'Click Para Eliminar';
            position: absolute;
            bottom: -2rem;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: #fff;
            padding: 0.5rem;
            border-radius: 0.25rem;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
            z-index: 999;
        }

        .tooltip:hover::after {
            opacity: .8;
        }
</style>