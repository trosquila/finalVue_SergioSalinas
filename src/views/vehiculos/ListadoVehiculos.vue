<script setup>
import { getMarcas, modeloDeMarcaConcreta } from '../../assets/js/consultas.js';
import { onBeforeMount, ref } from 'vue';

const listaMarcas = ref(null);
const listaModelos = ref(null);

const marcaSeleccionada = ref(null);
const modeloSeleccionado = ref(null);

onBeforeMount(async () => {
    listaMarcas.value = await getMarcas();
})

async function elegirModelos() {
    const marca = marcaSeleccionada.value;
    listaModelos.value = await modeloDeMarcaConcreta(marca);
    
}
</script>
<template>
    <section>
        <h2>Listado vehiculos</h2>
        <div>
            <div>
                <label for="">Marcas</label>
                <select name="" id="" v-model="marcaSeleccionada" @change="elegirModelos()">
                    <option v-for="(marca, index) in listaMarcas" :key="index" :value="marca.id">{{ marca.nombre }}</option>
                </select>    
            </div>
            <div>
                <label for="">Modelos</label>
                <select v-show="!listaModelos" name="" id="" disabled>
                    <option value="">No hay modelos disponibles de esta marca</option>
                </select>
                <select v-show="listaModelos" name="" id="" v-model="modeloSeleccionado">
                    <option v-for="(modelo, index) in listaModelos" :key="index" :value="modelo.id" >{{ modelo.modelo }}</option>
                </select>    
            </div>
        </div>
    </section>
    
</template>