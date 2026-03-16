<script setup>
import { getMarcas, modeloDeMarcaConcreta, getVehiculos, getClientes, guardarNuevoAlquiler } from '../../assets/js/consultas.js';

import { onBeforeMount, ref, computed } from 'vue';

const listaMarcas = ref([]);
const listaModelos = ref([]);
const listaVehiculos = ref([]);
const listaClientes = ref([]);

const marcaSeleccionada = ref(null);
const mostrarFormulario = ref(false);

const datosForm = ref({
    idModelo: null,
    idVehiculo: null,
    idCliente: null,
    dias: null,
    fechaInicio: ''
});

const alquilerRealizado = ref(null);

onBeforeMount(async () => {
    listaMarcas.value = await getMarcas();
});

async function elegirModelos() {
    mostrarFormulario.value = false;
    alquilerRealizado.value = null;

    datosForm.value.idModelo = null;
    datosForm.value.idVehiculo = null;
    datosForm.value.idCliente = null;
    datosForm.value.dias = null;
    datosForm.value.fechaInicio = '';

    listaModelos.value = await modeloDeMarcaConcreta(marcaSeleccionada.value);
}

async function mostrarVehiculos() {
    const todosVehiculos = await getVehiculos();
    listaVehiculos.value = todosVehiculos.filter(
        vehiculo => vehiculo.idModelo == datosForm.value.idModelo
    );
    listaVehiculos.value = listaVehiculos.value.map(vehi => ({
        id: vehi.id,
        modelo: listaModelos.value.find(mod => mod.id == vehi.idModelo).modelo
    }));
    console.log(listaVehiculos.value);

    listaClientes.value = await getClientes();

    datosForm.value.idVehiculo = null;
    datosForm.value.idCliente = null;
    datosForm.value.dias = null;
    datosForm.value.fechaInicio = '';

    mostrarFormulario.value = true;
}

const modeloSeleccionado = computed(() =>
    listaModelos.value.find(modelo => modelo.id == datosForm.value.idModelo)
);

const marcaTexto = computed(() =>
    listaMarcas.value.find(marca => marca.id == marcaSeleccionada.value)
);

const clienteSeleccionado = computed(() =>
    listaClientes.value.find(cliente => cliente.id == datosForm.value.idCliente)
);

async function alquilarVehiculo() {

    const nuevoAlquiler = {
        idVehiculo: datosForm.value.idVehiculo,
        idCliente: datosForm.value.idCliente,
        dias: datosForm.value.dias,
        fechaInicio: datosForm.value.fechaInicio
    };

    await guardarNuevoAlquiler(nuevoAlquiler);

    const precioBase = modeloSeleccionado.value?.precioDia || 0;
    const extraModelo = modeloSeleccionado.value?.precioExtra || modeloSeleccionado.value?.extra || 0;

    const precioTotal = (precioBase + extraModelo) * datosForm.value.dias;

    alquilerRealizado.value = {
        marca: marcaTexto.value?.nombre,
        modelo: modeloSeleccionado.value?.modelo,
        nombreCliente: clienteSeleccionado.value?.nombre,
        dniCliente: clienteSeleccionado.value?.dni,
        precioTotal
    };

    mostrarFormulario.value = false;

    datosForm.value.idVehiculo = null;
    datosForm.value.idCliente = null;
    datosForm.value.dias = null;
    datosForm.value.fechaInicio = '';
}
</script>

<template>
    <section>
        <h2>Alquiler de vehículos</h2>
        <form action="">
            <div>
                <div>
                    <label>Marca</label>
                    <select v-model="marcaSeleccionada" @change="elegirModelos">
                        <option :value="null">Selecciona una marca</option>
                        <option v-for="marca in listaMarcas" :key="marca.id" :value="marca.id">
                            {{ marca.nombre }}
                        </option>
                    </select>
                </div>

                <div>
                    <label>Modelo</label>
                    <select v-model="datosForm.idModelo">
                        <option v-for="modelo in listaModelos" :key="modelo.id" :value="modelo.id">
                            {{ modelo.modelo }}
                        </option>
                    </select>
                </div>

                <button :disabled="!marcaSeleccionada || !datosForm.idModelo" @click.prevent="mostrarVehiculos">
                    Mostrar Vehículos
                </button>
            </div>

            <div v-if="mostrarFormulario">
                <div>
                    <label>Vehículo</label>
                    <select v-model="datosForm.idVehiculo">
                        <option v-for="(vehiculo, index) in listaVehiculos" :key="index" :value="vehiculo.id">
                            {{ vehiculo.modelo }} - id {{ vehiculo.id }}
                        </option>
                    </select>
                </div>

                <div>
                    <label>Cliente</label>
                    <select v-model="datosForm.idCliente">
                        <option v-for="cliente in listaClientes" :key="cliente.id" :value="cliente.id">
                            {{ cliente.nombre }} - {{ cliente.dni }}
                        </option>
                    </select>
                </div>

                <div>
                    <label>Días</label>
                    <input type="number" min="1" v-model="datosForm.dias">
                </div>

                <div>
                    <label>Fecha inicio</label>
                    <input type="date" v-model="datosForm.fechaInicio">
                </div>

                <button @click="alquilarVehiculo">
                    Alquilar
                </button>
            </div>

            <div v-if="alquilerRealizado">
                <h3>Alquiler realizado</h3>
                <p><strong>Marca:</strong> {{ alquilerRealizado.marca }}</p>
                <p><strong>Modelo:</strong> {{ alquilerRealizado.modelo }}</p>
                <p><strong>Cliente:</strong> {{ alquilerRealizado.nombreCliente }}</p>
                <p><strong>DNI:</strong> {{ alquilerRealizado.dniCliente }}</p>
                <p><strong>Precio total:</strong> {{ alquilerRealizado.precioTotal }} €</p>
            </div>
        </form>
    </section>
</template>