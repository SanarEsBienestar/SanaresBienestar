<template>  
    <section>
        <div class="px-4 py-20 mx-auto max-w-7xl">
            <div class="w-full px-4 pt-5 pb-6 mx-auto mt-8 mb-6 bg-white rounded-lg shadow-lg sm:rounded-lg sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 sm:px-6">
                <h1 class="mb-4 text-lg font-semibold text-center text-blue">Crea tu cuenta - Reserva o Compra</h1>
                <form class="pb-1 space-y-4">
                    <label class="block">
                        <span class="block mb-1 text-xs font-medium text-gray">Nombre</span>
                        <input class="form-input" type="text" placeholder="Your full name" required />
                    </label>
                    <label class="block">
                        <span class="block mb-1 text-xs font-medium text-gray">Correo</span>
                        <input class="form-input" type="email" placeholder="Ex. james@bond.com" inputmode="email" required />
                    </label>
                    <label class="block">
                        <span class="block mb-1 text-xs font-medium text-gray">Contraseña</span>
                        <input class="form-input" type="password" placeholder="••••••••" required />
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" class="form-checkbox" />
                        <span class="block ml-2 text-xs font-medium text-gray cursor-pointer">Terminos & Condiciones de Privacidad</span>
                    </label>
                    <div class="flex flex-col items-start justify-between sm:items-center sm:flex-row">    
                        <input type="submit" class="rounded-md bg-blueaccent px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-orangeburn focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueaccent" value="Registro" />
                    </div>
                </form>
            </div>
            <p class="my-0 text-xs font-medium text-center text-gray sm:my-5">
                ¿Ya tiene cuenta?
                <a href="/login" class="text-black underline hover:text-orangeburn">Ingreso</a>
            </p>
        </div>
    </section>      
</template>
  