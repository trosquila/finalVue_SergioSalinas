<script setup>
import '../../assets/styles/global.css';
import {getPaises, guardarNuevaMarca} from '../../assets/js/consultas.js';
import { onBeforeMount, ref } from 'vue';

const listaPaises = ref(null);
const datosForm = ref({
    nombre:null,
    origen:null,
    anioFundacion:null
})
onBeforeMount(async () => {
    listaPaises.value = await getPaises();
    console.log(listaPaises.value);
    
})

function guardarMarca() {
    const datosAguardar = {...datosForm.value};
    guardarNuevaMarca(datosAguardar);

}

</script>
<template>
    <section class="contenedor">
        <h2>Nueva marca</h2>
        <form action="">
            <div>
                <label for="">Nombre de la marca</label>
                <input type="text" name="nombre" id="" v-model="datosForm.nombre">
            </div>
            <div>
                <label for="">Año de fundación</label>
                <input type="number" min="1800" placeholder="fechaFundacion" v-model="datosForm.anioFundacion" />   
            </div>
            <div>
                <label for="">Pais de fundación</label>
                <select name="pais" id="" v-model="datosForm.origen">
                    <option v-for="(pais, index) in listaPaises" :key="index" :value="pais">{{pais}}</option>
                </select>
            </div>
            <div>
                <button type="submit" @click="guardarMarca()">Guardar Nueva Marca</button>
            </div>
        </form>
    </section>
    
</template>