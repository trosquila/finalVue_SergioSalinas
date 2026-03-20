<script setup>
import '../../assets/styles/global.css';
import {obtenerMarcasPorPrecioMedio, obtenerModeloConPrecio} from '../../assets/js/consultas.js';
import { onBeforeMount, ref, computed } from 'vue';

const listaMarcasOrdenadas = ref(null);
const idMarcaMostrar = ref(null);
const listaModelos = ref([]);

onBeforeMount(async () => {
    listaMarcasOrdenadas.value = await obtenerMarcasPorPrecioMedio();
    listaModelos.value = await obtenerModeloConPrecio();
})

function mostrarModelos(idMarca) {
    idMarcaMostrar.value = idMarca;
}

const listaModelosFiltrados = computed(() => {
    return listaModelos.value.filter(mod => mod.idMarca === idMarcaMostrar.value);
});
</script>

<template>
    <section>
        <h2>Listado marcas</h2>
        <table>
            <tr>
                <th>NOMBRE</th>
                <th>ORIGEN</th>
                <th>AÑO FUNDACIÓN</th>
                <th>PRECIO MEDIO</th>
            </tr>
            <tr v-for="(marca, index) in listaMarcasOrdenadas"> 
                <td @click="mostrarModelos(marca.id)">{{ marca.nombre }}</td>
                <td>{{ marca.origen }}</td>
                <td>{{ marca.anioFundacion }}</td>
                <td>{{ marca.precioMedio }}</td>
            </tr>
        </table>

        <section>
            <div v-for="modelo in listaModelosFiltrados" :key="modelo.id">
                <p>{{ modelo.modelo }}</p>
                <p>{{ modelo.precioDia }}</p>
            </div>
        </section>
    </section>
</template>