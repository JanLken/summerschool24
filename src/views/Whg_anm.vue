<script setup>
import FormComponent from '../components/FormComponent.vue';
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import Papa from 'papaparse'
import Breadcrumbs from '../components/Breadcrumbs.vue'

const service = ref({}); // Anfangszustand auf leeres Objekt setzen
const checkliste = ref([]);
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
      path: `/service/${service.value.SID}`
    });
    paths.push({
    label: 'Formular'
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
    <h1>Wohnungsanmeldung</h1>
    <FormComponent />
  </div>
</template>

<style scoped>

div {
  margin: 20px;
  padding: 10px;
}

h1 {
  color: #333;
  text-align: center;
}
</style>
