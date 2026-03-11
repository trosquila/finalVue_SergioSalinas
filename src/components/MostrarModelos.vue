<script setup>
import { modelosConPrecioMedio, guardarNuevoExtra } from '../assets/js/consultas.js';
import {ref, watch  } from 'vue';

const props = defineProps(['idMarca']);
const idProps = ref(null);
const listaModelos = ref([]);

watch(
    () => props.idMarca,
    async (nuevoIdMarca) => {
        if (nuevoIdMarca) {
            idProps.value = nuevoIdMarca;
            listaModelos.value = await modelosConPrecioMedio(nuevoIdMarca);
            listaModelos.value = listaModelos.value.map(modelos => ({
                ...modelos,
                modificarExtra:null
            }));
        }
    },
    { immediate: true }
);

async function nuevoExtra(modeloAcambiar) {
    const precioExtraNuevo = modeloAcambiar.modificarExtra
    await guardarNuevoExtra(modeloAcambiar.id, precioExtraNuevo);

    listaModelos.value = await modelosConPrecioMedio(idProps.value);
    listaModelos.value = listaModelos.value.map(modelos => ({
        ...modelos,
        modificarExtra:null
    }));
}
</script>
<template>
    <table v-if="props.idMarca">
        <tr>
            <th>Modelo</th>
            <th>Precio Medio Dia</th>
            <th>Extra por modelo</th>
        </tr>
        <tr v-for="(modelos, index) in listaModelos" :key="index">
            <td>{{ modelos.modelo }}</td>
            <td>{{ modelos.precioMedioDia }}</td>
            <td v-if="modelos.extraPorModelo && modelos.extraPorModelo != 0">{{ modelos.extraPorModelo }}</td>
            <td v-else><input type="number" name="" id="" @keypress.enter="nuevoExtra(modelos)" v-model="modelos.modificarExtra"></td>
        </tr>
    </table>
</template>