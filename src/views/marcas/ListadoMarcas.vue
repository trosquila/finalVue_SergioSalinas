<script setup>
import '../../assets/styles/global.css';
import {obtenerMarcasPorPrecioMedio} from '../../assets/js/consultas.js';
import { onBeforeMount, ref } from 'vue';
import MostrarModelos from '@/components/MostrarModelos.vue';

const listaMarcasOrdenadas = ref(null);
const idMarcaMostrar = ref(null);

onBeforeMount(async () => {
    listaMarcasOrdenadas.value = await obtenerMarcasPorPrecioMedio();
})

function mostrarModelos(idMarca) {
    idMarcaMostrar.value = idMarca;
}
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
        <MostrarModelos :idMarca="idMarcaMostrar"></MostrarModelos>
    </section>
</template>