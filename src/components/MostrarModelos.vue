<script setup>
import { modelosConPrecioMedio, guardarNuevoExtra } from '../assets/js/consultas.js';
import {ref, watch  } from 'vue';

const props = defineProps(['idMarca']);

const listaModelos = ref([]);
console.log(props.idMarca);


watch(
    () => props.idMarca,
    async (nuevoIdMarca) => {
        if (nuevoIdMarca) {
            listaModelos.value = await modelosConPrecioMedio(nuevoIdMarca);
            console.log(listaModelos.value);
            
            listaModelos.value = listaModelos.value.map(modelos => ({
                ...modelos,
                modificarExtra:null
            }));
        } else {
            listaModelos.value = [];
        }
    },
    { immediate: true }
);

function nuevoExtra(modeloAcambiar) {
    const precioExtraNuevo = modeloAcambiar.modificarExtra
    guardarNuevoExtra(modeloAcambiar.id, precioExtraNuevo);
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