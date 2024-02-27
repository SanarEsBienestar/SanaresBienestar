<template>
    <section >
        <div class="px-0 py-20 mx-auto max-w-7xl sm:px-4">
            <div class="w-full px-4 pt-5 pb-6 mx-auto mt-8 mb-6 bg-white rounded-lg shadow-lg sm:rounded-lg sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 sm:px-6">
            <h1 class="mb-4 text-lg font-semibold text-center text-blue">Ingresa a tu cuenta</h1>
            <form class="mb-8 space-y-4">
                <label class="block">
                <span class="block mb-1 text-xs font-medium text-gray">Correo</span>
                <input class="form-input" type="email" placeholder="Ex. pepito@perez.com" inputmode="email" required />
                </label>
                <label class="block">
                <span class="block mb-1 text-xs font-medium text-gray">Contraseña</span>
                <input class="form-input" type="password" placeholder="••••••••" required />
                </label>
                <input type="submit" class="rounded-md bg-blueaccent px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-yellowburn focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500" value="Login" />
            </form>
            </div>
            <p class="mb-4 text-xs text-center text-gray">
            <a href="/register" class="text-black underline hover:text-orangeburn">Crear un cuenta</a>
            ·
            <a href="#" class="text-black underline hover:text-orangeburn">Olvidó la Contraseña?</a>
            ·
            <a href="#" class="text-black underline hover:text-orangeburn">Terminos & Privacidad</a>
            </p>
        </div>
    </section>
</template>