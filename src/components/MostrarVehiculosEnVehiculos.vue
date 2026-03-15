<script setup>
import { obtenerVehiculosConClientes } from '../assets/js/consultas.js';
import { onBeforeMount, ref, watch } from 'vue';

const props = defineProps(['marca', 'modelo']);

const listaVehiculos = ref([]);

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


</script>

<template>
    <section>
        <div v-if="listaVehiculos.length === 0">
            <p>No hay vehículos disponibles</p>
        </div>

        <div v-for="vehiculo in listaVehiculos" :key="vehiculo.id">
            <h3>{{ vehiculo.modelo }} - {{ vehiculo.precioDia }} €/día</h3>

            <ul v-if="vehiculo.clientes.length > 0">
                <li v-for="cliente in vehiculo.clientes" :key="cliente.id">
                    {{ cliente.nombre }}
                </li>
            </ul>

            <p v-else>No lo ha alquilado ningún cliente</p>
        </div>

        <button>Nuevo Vehículo</button>
    </section>
</template>