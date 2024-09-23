<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import Tiles from './Tiles.vue'
import Papa from 'papaparse'
import '@fortawesome/fontawesome-free/css/all.css';

const router = useRouter(); // Router instanziieren
const categories = ref([]); // Array für die Kacheln

onMounted(() => {
  fetch('../Data/Kategorien.csv') // Pfad zur CSV-Datei
    .then(response => response.text()) // Hole die CSV-Daten als Text
    .then(data => {
      // Parse die CSV-Daten mit PapaParse
      Papa.parse(data, {
        header: true, // Erste Zeile als Header verwenden
        complete: (results) => {
          categories.value = results.data; // Speichere die geparsten Daten
        },
        skipEmptyLines: true // Leere Zeilen überspringen
      });
    });
});


// Navigationsfunktion
const navigateToCategory = (id) => {
  router.push(`/category/${id}`);
};

</script>

<template>
  <div class="tiles-container" >
    <div v-for="category in categories" :key="category.CID" class="tiles-wrapper" @click="navigateToCategory(category.CID)">
      <Tiles>
        <template v-slot:icon>
          <i :class="category.iconClass"></i> 
        </template>
        <template #service>
          {{ category.Kategorie }}
        </template>
      </Tiles>
    </div>
  </div>
</template>

<style scoped>
.tiles-container {
  display: flex;
  flex-wrap: wrap; /* Flexbox mit Zeilenumbruch */
  gap: 20px; /* Abstand zwischen den Kacheln */
  justify-content: center;
  align-items: center;
  width: 967px;
}

.tile-wrapper {
  width: 200px; /* Festgelegte Breite jeder Kachel */
  flex: 1 1 auto; /* Flex-Wachstumsfaktor, sodass die Kacheln automatisch in die nächste Zeile springen */
}
</style>
