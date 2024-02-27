<!-- src/App.vue -->

<template>
    <div id="app" class="bg-gray-100 p-8">
      <FetchDataForm @fetch-data="fetchDataAndSaveToFile" />
      
      <div id="result" class="mt-8 text-gray-700">
        <!-- Aquí se mostrará el estado actual del array -->
      </div>
    </div>
  </template>
  
  <script>
  import FetchDataForm from "./UpdateData.vue";
  import { fetchDataAndSaveToFile } from "../../../assets/fetchToSave.js";
  
  export default {
    components: {
      FetchDataForm,
    },
    methods: {
      async fetchDataAndSaveToFile(urls) {
        const resultContainer = document.getElementById("result");
  
        try {
          const result = await fetchDataAndSaveToFile(urls);
          resultContainer.textContent = `Datos obtenidos: ${JSON.stringify(result, null, 2)}`;
        } catch (error) {
          resultContainer.textContent = `Error: ${error.message}`;
        }
      },
    },
  };
  </script>
  