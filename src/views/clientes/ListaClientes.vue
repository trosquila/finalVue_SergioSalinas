<script setup>
import '../../assets/styles/global.css';
import { getClientes, guardarNuevoUsuario, modificarUsuario, eliminarUsuario } from '../../assets/js/consultas.js';
import { onBeforeMount, ref } from 'vue';
import VehiculosDelUsuario from '@/components/VehiculosDelUsuario.vue';

const listaClientes = ref([]);
const idCliente = ref(null);

const datosForm = ref({
    nombre: '',
    dni: '',
    alquileres: []
});

const usuarioElegido = ref(false);

onBeforeMount(async () => {
    listaClientes.value = await getClientes();
});

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
    <section class="contenedor">
        <div class="listaDatos">
            <div v-if="listaClientes.length === 0">
                <p>No hay clientes disponibles</p>
            </div>

            <div v-for="cliente in listaClientes" :key="cliente.id">
                <p @click="mostrarVehiculosDelUser(cliente)">
                    <span>Nombre:</span> {{ cliente.nombre }} DNI: {{ cliente.dni }}
                </p>
            </div>
        </div>

        <VehiculosDelUsuario :idCliente="idCliente"></VehiculosDelUsuario>

        <form action="" class="formElegante">
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

    </section>
</template>