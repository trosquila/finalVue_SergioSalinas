<script setup>
import { getMarcas, modeloDeMarcaConcreta, guardarNuevoVehiculo } from '../assets/js/consultas.js';
import { onBeforeMount, ref, watch } from 'vue';

const props = defineProps(['marca', 'modelo']);

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

    marcaSeleccionada.value = props.marca ? props.marca : null;
    datosForm.value.idModelo = props.modelo ? props.modelo : null;

    if (marcaSeleccionada.value) {
        listaModelos.value = await modeloDeMarcaConcreta(marcaSeleccionada.value);
    }
});

watch(
    () => props.marca,
    async (nuevaMarca) => {
        marcaSeleccionada.value = nuevaMarca ? nuevaMarca : null;

        if (marcaSeleccionada.value) {
            listaModelos.value = await modeloDeMarcaConcreta(marcaSeleccionada.value);
        } else {
            listaModelos.value = [];
            datosForm.value.idModelo = null;
        }
    }
);

watch(
    () => props.modelo,
    (nuevoModelo) => {
        datosForm.value.idModelo = nuevoModelo ? nuevoModelo : null;
    }
);

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
    <section>
        <form action="">
            <div>
                <label for="">Marca</label>
                <select v-model="marcaSeleccionada" @change="elegirModelos()" :disabled="props.marca">
                    <option v-for="(marca, index) in listaMarcas" :key="index" :value="marca.id">
                        {{ marca.nombre }}
                    </option>
                </select>
            </div>

            <div>
                <label for="">Modelo</label>
                <select v-model="datosForm.idModelo" :disabled="props.modelo">
                    <option v-for="(modelo, index) in listaModelos" :key="index" :value="modelo.id">
                        {{ modelo.modelo }}
                    </option>
                </select>
            </div>

            <div>
                <label for="">Precio por día</label>
                <input type="number" v-model="datosForm.precioDia">
            </div>

            <div>
                <label for="">Número de puertas</label>
                <input type="number" v-model="datosForm.puertas">
            </div>

            <div>
                <label for="">¿Contiene una silla infantil?</label>
                <input type="checkbox" v-model="datosForm.sillaInfantil">
            </div>

            <button class="btnPrincipal" @click.prevent="nuevoVehiculo()">Guardar nuevo vehículo</button>
        </form>
    </section>
</template>