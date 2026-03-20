<script setup>
import '../../assets/styles/global.css';
import {getMarcas, modelosConPrecioMedio, guardarNuevoExtra} from '../../assets/js/consultas.js'
import { onBeforeMount, ref, watch } from 'vue';

const marcaSeleccionada = ref(null);
const marcasLista = ref(null);
const listaModelos = ref([]);
const idProps = ref(null);

onBeforeMount(async () => {
    marcasLista.value = await getMarcas();
})

watch(
    () => marcaSeleccionada.value,
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
    <section class="contenedor">
        <h2>Modelos</h2>
        <div>
            <select name="" id="" v-model="marcaSeleccionada">
                <option :value="marca.id" v-for="(marca, index) in marcasLista">{{ marca.nombre }}</option>
            </select>

            <table v-if="marcaSeleccionada">
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
        </div>
    </section>
</template>