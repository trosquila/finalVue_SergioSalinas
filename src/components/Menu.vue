<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav>
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/clientes">Lista clientes</RouterLink>
        <RouterLink to="/marcas">Listado marcas</RouterLink>
        <RouterLink to="/marcas/nueva">Nueva marca</RouterLink>
        <RouterLink to="/marcas/modelo/nuevo">Nuevo modelo</RouterLink>
        <RouterLink to="/vehiculos">Listado vehículos</RouterLink>
        <RouterLink to="/vehiculos/nuevo">Nuevo vehículo</RouterLink>
        <RouterLink to="/vehiculos/alquiler">Alquiler vehículo</RouterLink>
    </nav>
</template>