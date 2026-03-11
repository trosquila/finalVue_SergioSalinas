<script setup>
import '../../assets/styles/global.css';
import {getMarcas} from '../../assets/js/consultas.js'
import { onBeforeMount, ref } from 'vue';
import MostrarModelos from '@/components/MostrarModelos.vue';

const marcaSeleccionada = ref(null);
const marcasLista = ref(null);

onBeforeMount(async () => {
    marcasLista.value = await getMarcas();
})
</script>
<template>
    <section>
        <h2>Modelos</h2>
        <div>
            <select name="" id="" v-model="marcaSeleccionada">
                <option :value="marca.id" v-for="(marca, index) in marcasLista" >{{ marca.nombre }}</option>
            </select>
            <MostrarModelos :idMarca="marcaSeleccionada"></MostrarModelos>
        </div>
    </section>
</template>