<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/Menu.vue';
</script>

<template>
  <main>
    <Menu></Menu>
    <RouterView></RouterView>
  </main>
</template>