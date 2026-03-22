<script setup>
import '../../assets/styles/global.css';
import { getClientes, guardarNuevoUsuario, modificarUsuario, eliminarUsuario, getVehiculosUsario } from '../../assets/js/consultas.js';
import { onBeforeMount, ref, watch } from 'vue';

const listaClientes = ref([]);
const idCliente = ref(null);
const listaVehiculos = ref([]);

const datosForm = ref({
    nombre: '',
    dni: '',
    alquileres: []
});

const usuarioElegido = ref(false);

onBeforeMount(async () => {
    listaClientes.value = await getClientes();
});

watch(
    () => idCliente.value,
    async (nuevoIdCliente) => {
        if (nuevoIdCliente) {
            listaVehiculos.value = await getVehiculosUsario(nuevoIdCliente);
        } else {
            listaVehiculos.value = [];
        }
    },
    { immediate: true }
);

function mostrarVehiculosDelUser(cliente) {
    idCliente.value = cliente.id;
    usuarioElegido.value = true;

    datosForm.value = {
        nombre: cliente.nombre,
        dni: cliente.dni,
        alquileres: [...cliente.alquileres]
    };
}

async function guardarCliente() {
    const dato = { ...datosForm.value };
    await guardarNuevoUsuario(dato);

    listaClientes.value = await getClientes();

    datosForm.value = {
        nombre: '',
        dni: '',
        alquileres: []
    };
}

async function modificarCliente() {
    const dato = { ...datosForm.value };
    await modificarUsuario(idCliente.value, dato);

    listaClientes.value = await getClientes();

    datosForm.value = {
        nombre: '',
        dni: '',
        alquileres: []
    };

    idCliente.value = null;
    usuarioElegido.value = false;
}

async function eliminarCliente() {
    await eliminarUsuario(idCliente.value);

    listaClientes.value = await getClientes();

    datosForm.value = {
        nombre: '',
        dni: '',
        alquileres: []
    };

    idCliente.value = null;
    usuarioElegido.value = false;
}
</script>

<template>
    <section class="contenedor paginaClientes">

        <div class="listaDatos columnaClientes">
            <div v-if="listaClientes.length === 0">
                <p>No hay clientes disponibles</p>
            </div>
            <div v-for="cliente in listaClientes" :key="cliente.id">
                <p @click="mostrarVehiculosDelUser(cliente)">
                    <span>Nombre:</span> {{ cliente.nombre }} DNI: {{ cliente.dni }}
                </p>
            </div>
        </div>

        <div class="columnaDerecha">
            <section>
                <h3 class="tituloSeccion">Vehículos alquilados</h3>
                <div v-if="!idCliente">
                    <p class="mensajeVacio">Selecciona un cliente</p>
                </div>
                <div v-else-if="listaVehiculos.length === 0">
                    <p class="mensajeVacio">Este cliente no ha alquilado vehículos</p>
                </div>
                <div class="listaDatos" v-else>
                    <div v-for="(vehiculo, index) in listaVehiculos" :key="index" class="filaVehiculo">
                        <span class="modelo-nombre">{{ vehiculo.marca }} {{ vehiculo.modelo }}</span>
                        <span class="modelo-precio">{{ vehiculo.PrecioTotal }} €</span>
                    </div>
                </div>
            </section>

            <form action="" class="formulario">
                <div class="contenidoForm">
                    <label for="nombre">Nombre</label>
                    <input id="nombre" type="text" v-model="datosForm.nombre">
                </div>
                <div class="contenidoForm">
                    <label for="dni">DNI</label>
                    <input id="dni" type="text" v-model="datosForm.dni">
                </div>
                <div class="accionesForm">
                    <button type="button" class="btnPrincipal" @click.prevent="guardarCliente()" :disabled="usuarioElegido">Alta</button>
                    <button type="button" class="btnSecundario" @click.prevent="modificarCliente()" :disabled="!usuarioElegido">Modificar</button>
                    <button type="button" class="btnSecundario" @click.prevent="eliminarCliente()" :disabled="!usuarioElegido">Eliminar</button>
                </div>
            </form>
        </div>

    </section>
</template>