<script setup>
import '../../assets/styles/global.css';
import {getMarcas, guardarNuevoModelo} from '../../assets/js/consultas.js';
import { onBeforeMount, ref } from 'vue';

const datosForm = ref({
    idModelo:null,
    modelo:null,
    extraPorModelo:null
});

const listaMarcas = ref(null);

onBeforeMount(async () => {
    listaMarcas.value = await getMarcas();   
})

function guardarModelo() {
    let datoAguardar = {...datosForm.value};
    datoAguardar.extraPorModelo == null? datoAguardar.extraPorModelo = 0:'';
    guardarNuevoModelo(datoAguardar);
    
    datosForm.value ={
        idModelo:null,
        modelo:null,
        extraPorModelo:null
    };
}
</script>
<template>
    <section>
        <h2>Nuevo modelo</h2>
        <form action="" method="post">
            <div>
                <label for="">Marca</label>
                <select name="" id="" required v-model="datosForm.idModelo">
                    <option v-for="(marca, index) in listaMarcas" :key="index" :value="marca.id">{{ marca.nombre }}</option>
                </select>
            </div>
            <div>
                <label for="">Modelo</label>
                <input type="text" name="" id="" v-model="datosForm.modelo" required>
            </div>
            <div>
                <label for="">Precio extra</label>
                <input type="number" name="" id="" v-model="datosForm.extraPorModelo">
            </div>
            <button type="submit" @click="guardarModelo()">Guardar Modelo</button>
        </form>
    </section>
    
</template>