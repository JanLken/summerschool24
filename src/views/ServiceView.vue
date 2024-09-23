<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import Papa from 'papaparse'
import Breadcrumbs from '../components/Breadcrumbs.vue'

const router = useRouter(); // Router instanziieren
const route = useRoute(); // Current route instance
const service = ref({}); // Anfangszustand auf leeres Objekt setzen
const checkliste = ref([]);
const checkedItems = ref([]);
const categoryname = ref('')

const props = defineProps({
  serviceId: String
});

// Computed property for breadcrumbs
const breadcrumbs = computed(() => {
  const paths = [];
  paths.push({
    label: 'Home',
    path: '/'
  });
  if (categoryname.value) {
    // Add category breadcrumb if category name is available
    paths.push({
      label: categoryname.value,
      path: `/category/${service.value.CID}` // Correct path to the category
    });
  }
  if (service.value && service.value.Service) {
    paths.push({
      label: service.value.Service,
      path: router.currentRoute.value.fullPath
    });
  }
  return paths;
});

onMounted(() => {
  // Fetch service data
  fetch('../Data/Services_und_Dienstleistungen_Berlin.csv')
    .then(response => response.text())
    .then(data => {
      Papa.parse(data, {
        header: true,
        complete: (results) => {
          service.value = results.data.find(item => item.SID === props.serviceId);
          if (service.value) {
            checkliste.value = service.value.Dokumente.split(';').map(doc => doc.trim());
          }
        },
        skipEmptyLines: true
      });
    })
    .catch(error => console.error('Fehler beim Laden der CSV-Daten:', error));

  // Fetch category data based on service's CID
  fetch('../Data/Kategorien.csv')
    .then(response => response.text())
    .then(data => {
      Papa.parse(data, {
        header: true,
        complete: (results) => {
          const categoryData = results.data.find(item => item.CID === service.value.CID);
          categoryname.value = categoryData ? categoryData.Kategorie : 'Unbekannte Kategorie';
        },
        skipEmptyLines: true
      });
    })
    .catch(error => console.error('Fehler beim Laden der Daten:', error));
});
</script>


<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />

    <div v-if="service">
      <h2>{{ service.Service }}</h2>
      <br>
      <p class="text">{{ service.Info }}</p>
      <br>

      <strong class="subheading">Voraussetzungen:</strong>
      <p class="text">{{ service.Voraussetzung }}</p>
      <br>

      <strong class="subheading">Checkliste Dokumente:</strong>
      <div class="checklist-container">
        <div v-for="document in checkliste" :key="document" class="checklist-item">
          <input type="checkbox" :id="document" :name="document" :value="document" v-model="checkedItems" />
          <label :for="document">{{ document }}</label>
        </div>
      </div>
      <br>
      <div>
        <a :href="service.Link" target="_blank" rel="noopener noreferrer">
          <button class="button link">zu berlin.de</button>
        </a>
        <router-link :to="{ name: 'whgAnm', params: { serviceId: props.serviceId } }">
          <button class="button to-form">Zum Formular {{ service.Service }}</button>
        </router-link>
      </div>
    </div>
    <div v-else>
      <p>Lade Daten...</p>
    </div>
  </div>
</template>



<style scoped>
/* Container for checklist items */
.checklist-container {
  display: flex;
  flex-direction: column;
}

/* Style the checkbox */
.checklist-item input[type="checkbox"] {
  width: 20px; /* Breite der Checkbox */
  height: 20px; /* Höhe der Checkbox */
  margin: 5px;
  accent-color: #64a0e0; /* Customize the color of the checkbox */
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 3px;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

/* Label style */
.checklist-item label {
  font-size: 14px;
  cursor: pointer;
  color: #333;
  transition: color 0.3s ease;
}

.text {
  font-size: 14px;
  cursor: pointer;
  color: #333;
  transition: color 0.3s ease;
}



/* Hover effect for checklist items */
.checklist-item:hover input[type="checkbox"] {
  border-color: #64a0e0;
}

.checklist-item:hover label {
  color: #64a0e0;
}

/* Style the link button */
.button {
  height: 40px;
  border-radius: 20px;
  background-color: #64a0e0;
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button.link{
  width: 150px;
  } 

.button.to-form {
  width: 300px
  }

.button:hover {
  background-color: #528ec8;
}

.subheading {
  font-weight: bolder;
  font-size: 16px;
  color: #333;
}
</style>
