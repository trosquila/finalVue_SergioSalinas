<script setup>
import { getVehiculosUsario } from '../assets/js/consultas.js';
import { ref, watch } from 'vue';

const props = defineProps(['idCliente']);
const listaVehiculos = ref([]);

watch(
    () => props.idCliente,
    async (nuevoIdCliente) => {
        if (nuevoIdCliente) {
            listaVehiculos.value = await getVehiculosUsario(nuevoIdCliente);
        } else {
            listaVehiculos.value = [];
        }
    },
    { immediate: true }
);
</script>

<template>
    <section>
        <h3>Vehiculos alquilados</h3>
        <div v-if="!props.idCliente">
            <p>Selecciona un cliente</p>
        </div>

        <div v-else-if="listaVehiculos.length === 0">
            <p>Este cliente no ha alquilado vehículos</p>
        </div>

        <div v-for="(vehiculo, index) in listaVehiculos" :key="index">
            <h4>{{ vehiculo.marca }} {{ vehiculo.modelo }}</h4>
            <p>Precio final pagado: {{ vehiculo.PrecioTotal }} €</p>
        </div>
    </section>
</template>