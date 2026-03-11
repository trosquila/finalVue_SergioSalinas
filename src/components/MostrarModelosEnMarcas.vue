<script setup>
import { obtenerModeloConPrecio } from '../assets/js/consultas.js';
import { onBeforeMount, ref, computed } from 'vue';

const props = defineProps(['idMarca']);

const listaModelos = ref([]);

onBeforeMount(async () => {
    listaModelos.value = await obtenerModeloConPrecio();
});

const listaModelosFiltrados = computed(() => {
    return listaModelos.value.filter(mod => mod.idMarca === props.idMarca);
});


</script>

<template>
    <section>
        <div v-for="modelo in listaModelosFiltrados" :key="modelo.id">
            <p>{{ modelo.modelo }}</p>
            <p>{{ modelo.precioDia}}</p>
        </div>
    </section>
</template>