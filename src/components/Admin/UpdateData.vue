<!-- src/components/FetchDataForm.vue -->

<template>
    <form class="max-w-md mx-auto bg-white p-4 rounded shadow-md">
      <div v-for="item in checkboxes" :key="item.value" class="mb-4">
        <label :for="item.id" class="block text-gray font-bold mb-2">
          <input
            type="checkbox"
            :id="item.id"
            :value="item.value"
            v-model="selectedUrls"
            class="mr-2 leading-tight"
          />
          <span class="text-sm">{{ item.label }}</span>
        </label>
      </div>
      
      <button type="button" @click="handleButtonClick" class="bg-blueaccent text-white font-bold py-2 px-4 rounded hover:bg-bluewhite hover:text-blueaccent">
        Actualizar y Guardar
      </button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        checkboxes: [
          { id: 'availabilityCheckbox', value: 'availability', label: 'Availability' },
          { id: 'contactCheckbox', value: 'contact', label: 'Contact' },
          { id: 'servicesCheckbox', value: 'services', label: 'Services' },
          { id: 'terapistCheckbox', value: 'terapist', label: 'Terapist' },
        ],
        selectedUrls: [],
      };
    },
    methods: {
      handleButtonClick() {
        this.$emit('fetch-data', this.selectedUrls);
      },
    },
  };
  </script>  