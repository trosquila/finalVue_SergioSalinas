<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/Menu.vue';
import './assets/styles/global.css';
</script>

<template>
  <main>
    <Menu></Menu>
    <section class="contenidoPag">
      <RouterView></RouterView>
    </section>
    
  </main>
</template>