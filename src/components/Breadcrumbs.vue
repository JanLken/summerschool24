<!-- Breadcrumbs.vue -->
<template>
  <nav>
    <ul class="breadcrumbs">
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <router-link v-if="index < breadcrumbs.length - 1" :to="crumb.path">
          {{ crumb.label }}
        </router-link>
        <span v-else>{{ crumb.label }}</span>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  breadcrumbs: Array
});
</script>

<style scoped>
.breadcrumbs {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  font-size: 12px;
}

.breadcrumbs li {
  margin-right: 10px;
}

.breadcrumbs li::after {
  content: '/';
  margin-left: 10px;
}

.breadcrumbs li:last-child::after {
  content: '';
}

.breadcrumbs a {
  text-decoration: none;
  color: #64a0e0;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}
</style>

