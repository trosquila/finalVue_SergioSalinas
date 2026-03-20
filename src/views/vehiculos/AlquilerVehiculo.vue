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
    listaVehiculos.value = await getVehiculos();
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
        precioDia: vehi.precioDia,
        modelo: listaModelos.value.find(mod => mod.id == vehi.idModelo).modelo
    }));

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

const vehiculoSeleccionado = computed(() =>
    listaVehiculos.value.find(vehi => vehi.id == datosForm.value.idVehiculo)
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

    const extraModelo = modeloSeleccionado.value.extraPorModelo || 0;
    const precioBase = vehiculoSeleccionado.value.precioDia || 0;

    const precioTotal = (precioBase + extraModelo) * datosForm.value.dias;

    alquilerRealizado.value = {
        marca: marcaTexto.value.nombre,
        modelo: modeloSeleccionado.value.modelo,
        nombreCliente: clienteSeleccionado.value.nombre,
        dniCliente: clienteSeleccionado.value.dni,
        precioTotal:precioTotal
    };

    mostrarFormulario.value = false;

    datosForm.value.idVehiculo = null;
    datosForm.value.idCliente = null;
    datosForm.value.dias = null;
    datosForm.value.fechaInicio = '';
}
</script>

<template>
    <section class="contenedor">
        <h2 class="tituloSeccion">Alquiler de vehículos</h2>
        <form action="" class="formElegante">
            <div>
                <div class="contenidoForm">
                    <label>Marca</label>
                    <select v-model="marcaSeleccionada" @change="elegirModelos">
                        <option :value="null">Selecciona una marca</option>
                        <option v-for="marca in listaMarcas" :key="marca.id" :value="marca.id">
                            {{ marca.nombre }}
                        </option>
                    </select>
                </div>

                <div class="contenidoForm">
                    <label>Modelo</label>
                    <select v-model="datosForm.idModelo">
                        <option v-for="modelo in listaModelos" :key="modelo.id" :value="modelo.id">
                            {{ modelo.modelo }}
                        </option>
                    </select>
                </div>

                <div class="accionesForm">
                    <button class="btnPrincipal" :disabled="!marcaSeleccionada || !datosForm.idModelo" @click.prevent="mostrarVehiculos">
                        Mostrar Vehículos
                    </button>
                </div>
            </div>

            <div v-if="mostrarFormulario">
                <div class="contenidoForm">
                    <label>Vehículo</label>
                    <select v-model="datosForm.idVehiculo">
                        <option v-for="(vehiculo, index) in listaVehiculos" :key="index" :value="vehiculo.id">
                            {{ vehiculo.modelo }} - id {{ vehiculo.id }}
                        </option>
                    </select>
                </div>

                <div class="contenidoForm">
                    <label>Cliente</label>
                    <select v-model="datosForm.idCliente">
                        <option v-for="cliente in listaClientes" :key="cliente.id" :value="cliente.id">
                            {{ cliente.nombre }} - {{ cliente.dni }}
                        </option>
                    </select>
                </div>

                <div class="contenidoForm">
                    <label>Días</label>
                    <input type="number" min="1" v-model="datosForm.dias">
                </div>

                <div class="contenidoForm">
                    <label>Fecha inicio</label>
                    <input type="date" v-model="datosForm.fechaInicio">
                </div>

                <div class="accionesForm">
                    <button class="btnPrincipal" @click.prevent="alquilarVehiculo">Alquilar</button>
                </div>
            </div>
        </form>

        <div v-if="alquilerRealizado" class="listaDatos">
            <h3 class="tituloSeccion">Alquiler realizado</h3>
            <p><span>Marca:</span> {{ alquilerRealizado.marca }}</p>
            <p><span>Modelo:</span> {{ alquilerRealizado.modelo }}</p>
            <p><span>Cliente:</span> {{ alquilerRealizado.nombreCliente }}</p>
            <p><span>DNI:</span> {{ alquilerRealizado.dniCliente }}</p>
            <p><span>Precio total:</span> {{ alquilerRealizado.precioTotal }} €</p>
        </div>
    </section>
</template>