<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SearchBar from '/src/components/SearchBar.vue'
import SearchInput from 'vue-search-input'
</script>

<template>
  <header>
    <router-link to="/">
      <h1 class="clickable-header">Services und Dienstleistungen Berlin</h1>
    </router-link>
  </header>

  <SearchInput v-model="searchVal" />  
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
.clickable-header {
  cursor: pointer;
  color: black; /* Standardfarbe */
  transition: color 0.3s ease;
}

.clickable-header:hover {
  color: #64a0e0; /* Farbe beim Hover */
}
</style>
