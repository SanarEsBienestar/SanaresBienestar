<template>
    <body class="overflow-y-hidden">
        <div class="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
            <div class="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
                <div class="flex w-full  flex-col justify-start items-start">
                    <div class="">
                        <p class="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Check out</p>
                    </div>
                    <div class="mt-2">
                        <a href="javascript:void(0)" class="text-base leading-4 underline  hover:text-gray-800 text-gray-600">Back to my bag</a>
                    </div>
                    <div class="mt-12">
                        <p class="text-xl font-semibold leading-5 text-gray-800">Shipping Details</p>
                    </div>
                    <div class="mt-8 flex flex-col justify-start items-start w-full space-y-8 ">
                        <input class="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="First Name">
                        <input class="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="Last Name">
                        <input class="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="Address">
                        <input class="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="Address (line 02)">
                        <div class="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8">
                            <div class="relative w-full">
                                <p id="button1" class=" px-2 border-b border-gray-200 text-left leading-4 text-base text-gray-600 py-4 w-full">{{text}}
                                </p>
                                <button @click="show=!show" class="focus:outline-none focus:ring-2 focus:ring-2 focus:ring-gray-500 rounded-full cursor-pointer absolute bottom-4 right-0">
                                <svg  v-if="!show" id="close" class=""  width="16" 
                                    viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 6L8 10L4 6" stroke="#4B5563" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <svg  id="open" v-if="show"  class="transform rotate-180 " width="16"
                                     viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 6L8 10L4 6" stroke="#4B5563" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </button>
                                <div v-if="show" id="menu" class="shadow absolute z-10 bg-white top-10  w-full mt-3">
                                    <div class="flex flex-col  w-full">
                                        <p tabindex="0" @click="text='London',show=false" class="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left  text-base text-gray-600 py-2 w-full">
                                            London</p>
                                        <p tabindex="0" @click="text='New York',show=false" class="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left  text-base text-gray-600 py-2 w-full">
                                            New York</p>
                                        <p tabindex="0" @click="text='Dubai',show=false" class="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left  text-base text-gray-600 py-2 w-full">
                                            Dubai</p>
                                    </div>
                                </div>
                            </div>
    
                            <div class="relative w-full">
                                <p id="button2" class=" px-2 border-b border-gray-200 text-left leading-4 text-base text-gray-600 py-4 w-full">{{region}}
                                    <span v-if="region==='Region'" class="text-gray-400"> (optional)</span>
                                </p>
                                <button @click="show1=!show1" class="focus:outline-none focus:ring-2 focus:ring-2 focus:ring-gray-500 rounded-full cursor-pointer absolute bottom-4 right-0">
                                    <svg v-if="!show1" id="close2" class=""  width="16" 
                                        viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 6L8 10L4 6" stroke="#4B5563" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                    <svg v-if="show1" id="open2"   class=" transform rotate-180 " width="16"
                                         viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 6L8 10L4 6" stroke="#4B5563" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </button>
                                <div v-if="show1" id="menu2" class="absolute z-10 bg-white top-10 shadow w-full mt-3">
                                    <div class="flex flex-col  w-full">
                                        <p tabindex="0" @click="region='London',show1=false" class="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left  text-base text-gray-600 py-2 w-full">
                                            London</p>
                                        <p tabindex="0" @click="region='New York',show1=false" class="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left  text-base text-gray-600 py-2 w-full">
                                            New York</p>
                                        <p tabindex="0" @click="region='Dubai',show1=false" class="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left  text-base text-gray-600 py-2 w-full">
                                            Dubai</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8">
                            <div class="relative w-full">
                                <p id="button3" class=" px-2 border-b border-gray-200 text-left leading-4 text-base text-gray-600 py-4 w-full">{{country}}
                                </p>
                                <button @click="show2=!show2" class="focus:outline-none focus:ring-2 focus:ring-2 focus:ring-gray-500 rounded-full cursor-pointer absolute bottom-4 right-0">
                                    <svg  id="close3" v-if="!show2" class=""  width="16" 
                                        viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 6L8 10L4 6" stroke="#4B5563" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                    <svg  id="open3" v-if="show2" class="transform rotate-180 " width="16"
                                         viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 6L8 10L4 6" stroke="#4B5563" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </button>
                                <div id="menu3" v-if="show2" class="absolute z-10 bg-white top-10 shadow w-full mt-3">
                                    <div class="flex flex-col  w-full">
                                        <p tabindex="0 " @click="country='USA',show2=false" class="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left  text-base text-gray-600 py-2 w-full">
                                            USA</p>
                                        <p tabindex="0 " @click="country='UK',show2=false" class="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left  text-base text-gray-600 py-2 w-full">
                                            UK</p>
                                        <p tabindex="0 " @click="country='Russia',show2=false" class="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left  text-base text-gray-600 py-2 w-full">
                                            Russia</p>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full">
                                <input class="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 pt-4 pb-3   w-full" type="text" placeholder="Zip Code">
                            </div>
                        </div>
                        <input class="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4   w-full" type="text" placeholder="Phone Number">
                    </div>
                    <button class="focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-2 focus:ring-ocus:ring-gray-800 leading-4 hover:bg-black py-4 w-full md:w-4/12 lg:w-full text-white bg-gray-800">Proceed to payment</button>
                    <div class="mt-4 flex justify-start items-center w-full">
                        <a href="javascript:void(0)" class="text-base leading-4 underline focus:outline-none focus:text-gray-500  hover:text-gray-800 text-gray-600">Back to my bag</a>
                    </div>
                </div>
    
                <div class="flex flex-col justify-start items-start bg-gray-50 w-full p-6 md:p-14">
                    <div>
                        <h1 class="text-2xl font-semibold leading-6 text-gray-800">Order Summary</h1>
                    </div>
                    <div class="flex mt-7 flex-col items-end w-full space-y-6">
                        <div class="flex justify-between w-full items-center">
                            <p class="text-lg leading-4 text-gray-600">Total items</p>
                            <p class="text-lg font-semibold leading-4 text-gray-600">20</p>
                        </div>
                        <div class="flex justify-between w-full items-center">
                            <p class="text-lg leading-4 text-gray-600">Total Charges</p>
                            <p class="text-lg font-semibold leading-4 text-gray-600">$2790</p>
                        </div>
                        <div class="flex justify-between w-full items-center">
                            <p class="text-lg leading-4 text-gray-600">Shipping charges</p>
                            <p class="text-lg font-semibold leading-4 text-gray-600">$90</p>
                        </div>
                        <div class="flex justify-between w-full items-center">
                            <p class="text-lg leading-4 text-gray-600">Sub total </p>
                            <p class="text-lg font-semibold leading-4 text-gray-600">$3520</p>
                        </div>
                    </div>
                    <div class="flex justify-between w-full items-center mt-32">
                        <p class="text-xl font-semibold leading-4 text-gray-800">Estimated Total </p>
                        <p class="text-lg font-semibold leading-4 text-gray-800">$2900</p>
                    </div>
                </div>
            </div>
    
        </div>
    </body>
</template>

<script>
export default {
    name: "CheckOutStep1",
    data() {
        return {
            text: 'City',
            show: false,
            region: 'Region',
            show1: false,
            country: 'Country',
            show2: false,
        }
    },
    methods: {},
    mounted() {}
};
</script>