<script setup>
import { RouterLink, RouterView } from 'vue-router';
import '../assets/styles/global.css';
</script>

<template>
    <nav>
        <div class="opcionMenu">
            <RouterLink to="/">Inicio</RouterLink>
        </div>
        <div class="opcionMenu">
            <RouterLink to="/marcas">Marcas</RouterLink>
        </div>
        <div class="opcionMenuSecundario">
            <RouterLink to="/marcas/nueva">Nueva marca</RouterLink>
        </div>
        <div class="opcionMenuSecundario">
            <RouterLink to="/marcas/modelo">Lista modelos</RouterLink>
        </div>
        <div class="opcionMenuSecundario">
            <RouterLink to="/marcas/modelo/nuevo">Nuevo modelo</RouterLink>
        </div>
        <div class="opcionMenu">
            <RouterLink to="/vehiculos">Vehículos</RouterLink>
        </div>
        <div class="opcionMenuSecundario">
            <RouterLink to="/vehiculos/nuevo">Nuevo vehículo</RouterLink>
        </div>
        <div class="opcionMenuSecundario">
            <RouterLink to="/vehiculos/alquiler">Alquiler vehículo</RouterLink>
        </div>
        <div class="opcionMenu">
            <RouterLink to="/clientes">Clientes</RouterLink>
        </div>
    </nav>
</template>