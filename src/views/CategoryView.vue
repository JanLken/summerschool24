<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import Papa from 'papaparse'
import Breadcrumbs from '../components/Breadcrumbs.vue'

const router = useRouter(); // Router instanziieren
const services = ref([]); // Array für die Kacheln
const category = ref([]);
const categoryname = ref('')

const props = defineProps({
  categoryId: String
});

const breadcrumbs = computed(() => {
  const paths = [];
  
  // Always include the home breadcrumb
  paths.push({
    label: 'Home',
    path: '/'
  });

  if (categoryname.value) {
    // Add category breadcrumb if category name is available
    paths.push({
      label: categoryname.value,
      path: `/category/${props.categoryId}`
    });
  }

  return paths;
});

onMounted(() => {
  fetch('../Data/Services_und_Dienstleistungen_Berlin.csv') // Pfad zur CSV-Datei
    .then(response => response.text()) // Hole die CSV-Daten als Text
    .then(data => {
      // Parse die CSV-Daten mit PapaParse
      Papa.parse(data, {
        header: true, // Erste Zeile als Header verwenden
        complete: (results) => {
          services.value = results.data.filter(item => item.CID === props.categoryId); // Speichere die geparsten Daten
        },
        skipEmptyLines: true // Leere Zeilen überspringen
      });
    });

  fetch('../Data/Kategorien.csv') // Pfad zur CSV-Datei
    .then(response => response.text()) // Hole die CSV-Daten als Text
    .then(data => {
      // Parse die CSV-Daten mit PapaParse
      Papa.parse(data, {
        header: true, // Erste Zeile als Header verwenden
        complete: (results) => {
          category.value = results.data.filter(item => item.CID === props.categoryId); // Speichere die geparsten Daten
          categoryname.value = category.value.length > 0 ? category.value[0].Kategorie : 'Unbekannte Kategorie'; // Sicherstellen, dass categoryname gesetzt wird
        },
        skipEmptyLines: true // Leere Zeilen überspringen
      });
    })
    .catch(error => console.error('Fehler beim Laden der Daten:', error)); // Fehlerbehandlung
});

// Navigationsfunktion
const navigateToService = (serviceId) => {
  router.push(`/service/${serviceId}`);
};
</script>


<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />

    <h2>
      {{ categoryname }} <!-- Zeigt den categoryname an -->
    </h2>
    <div class="button-container">
      <!-- Loop durch die Services, um sie als Buttons darzustellen -->
      <button v-for="service in services" :key="service.SID" class="service-button" @click="navigateToService(service.SID)">
        {{ service.Service }}
      </button>
    </div>
  </div>
</template>


<style scoped>
.button-container {
  display: flex;
  flex-direction: column; /* Buttons untereinander anordnen */
  align-items: flex-start; /* Links ausrichten */
  gap: 10px; /* Abstand zwischen den Buttons */
  margin-top: 20px;
}

.service-button {
  background-color: #64a0e0; /* Blaues Hintergrundfarbe */
  color: white; /* Weißer Text */
  border: none;
  padding: 10px 20px;
  text-align: left; /* Text im Button links ausrichten */
  width: 100%; /* Button nimmt die volle Breite ein */
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.service-button:hover {
  background-color: #528ec8; /* Dunkleres Blau beim Hover */
}
</style>
