<script setup>
import '../../assets/styles/global.css';
import { getMarcas, modeloDeMarcaConcreta, guardarNuevoVehiculo } from '../../assets/js/consultas.js';
import { onBeforeMount, ref } from 'vue';

const listaMarcas = ref([]);
const listaModelos = ref([]);

const marcaSeleccionada = ref(null);

const datosForm = ref({
    idModelo: null,
    precioDia: null,
    puertas: null,
    sillaInfantil: false
});

onBeforeMount(async () => {
    listaMarcas.value = await getMarcas();
});

async function elegirModelos() {
    const marca = marcaSeleccionada.value;
    listaModelos.value = await modeloDeMarcaConcreta(marca);
    datosForm.value.idModelo = null;
}

function nuevoVehiculo() {
    guardarNuevoVehiculo(datosForm.value);
}
</script>

<template>
    <section class="contenedor">
        <h2>Nuevo Vehiculo</h2>
        <form action="" class="formulario">
            <div class="contenidoForm">
                <label for="">Marca</label>
                <select v-model="marcaSeleccionada" @change="elegirModelos()">
                    <option v-for="(marca, index) in listaMarcas" :key="index" :value="marca.id">
                        {{ marca.nombre }}
                    </option>
                </select>
            </div>

            <div class="contenidoForm">
                <label for="">Modelo</label>
                <select v-model="datosForm.idModelo">
                    <option v-for="(modelo, index) in listaModelos" :key="index" :value="modelo.id">
                        {{ modelo.modelo }}
                    </option>
                </select>
            </div>

            <div class="contenidoForm">
                <label for="">Precio por día</label>
                <input type="number" v-model="datosForm.precioDia">
            </div>

            <div class="contenidoForm">
                <label for="">Número de puertas</label>
                <input type="number" v-model="datosForm.puertas">
            </div>

            <div class="contenidoForm">
                <label for="">¿Contiene una silla infantil?</label>
                <input type="checkbox" v-model="datosForm.sillaInfantil">
            </div>

            <div class="accionesForm">
                <button class="btnPrincipal" @click.prevent="nuevoVehiculo()">Guardar nuevo vehículo</button>
            </div>
        </form>
    </section>
</template>