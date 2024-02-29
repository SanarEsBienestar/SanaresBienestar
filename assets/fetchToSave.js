import { promises as fs } from 'fs';
import apiPetition from './apiPetition.js';

export const fetchDataAndSaveToFile = async (urls) => {
  for (const url of urls) {
    try {
      const newUrl = url + '?populate=*'
      console.log(`Buscando datos de ${newUrl}...`);
      const response = await apiPetition('GET', newUrl);
      const filename = `./data/${url}.json`;
      await fs.writeFile(filename, JSON.stringify(response.data, null, 2));
      console.log(`Datos de ${url} guardados en ${filename}`);
    } catch (error) {
      console.error(`Error al obtener datos de ${url}: ${error.message}`);
    }
  }
};

// Lista de URLs que quieres actualizar
const urlsToUpdate = ['services', 'availability', 'contact', 'products', 'terapist', 'testimonial'];

fetchDataAndSaveToFile(urlsToUpdate);