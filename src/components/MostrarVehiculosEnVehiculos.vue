<script setup>
import { obtenerVehiculosConClientes } from '../assets/js/consultas.js';
import { onBeforeMount, ref, watch } from 'vue';
import FormularioNuevoVehiculo from './FormularioNuevoVehiculo.vue';

const props = defineProps(['marca', 'modelo']);

const listaVehiculos = ref([]);

const verFormNuevoVehi = ref(false);

onBeforeMount(async () => {
    await cargarVehiculos();
});

watch(
    () => props.marca,
    async () => {
        await cargarVehiculos();
    }
);

watch(
    () => props.modelo,
    async () => {
        await cargarVehiculos();
    }
);

async function cargarVehiculos() {
    listaVehiculos.value = await obtenerVehiculosConClientes(props.marca, props.modelo);
}

function crearNuevoVehiculo() {
    verFormNuevoVehi.value?verFormNuevoVehi.value=false:verFormNuevoVehi.value=true;
}
</script>

<template>
    <section>
        <div v-if="listaVehiculos.length === 0">
            <p>No hay vehículos disponibles</p>
        </div>

        <div v-for="vehiculo in listaVehiculos" :key="vehiculo.id">
            <h4>{{ vehiculo.modelo }} - {{ vehiculo.precioDia }} €/día</h4>

            <ul v-if="vehiculo.clientes.length > 0">
                <li v-for="cliente in vehiculo.clientes" :key="cliente.id">
                    {{ cliente.nombre }}
                </li>
            </ul>

            <p v-else>No lo ha alquilado ningún cliente</p>
        </div>

        <button class="btnPrincipal" v-show="verFormNuevoVehi === false" @click="crearNuevoVehiculo()">Nuevo Vehículo</button>
        <button class="btnSecundario" v-show="verFormNuevoVehi === true"  @click="crearNuevoVehiculo()">Cancelar</button>
        <div v-show="verFormNuevoVehi">
            <FormularioNuevoVehiculo :marca="props.marca" :modelo="props.modelo"></FormularioNuevoVehiculo>
        </div>
    </section>
</template>