<script setup>
import '../../assets/styles/global.css';
import { getClientes } from '../../assets/js/consultas.js';
import { onBeforeMount, ref } from 'vue';
import VehiculosDelUsuario from '@/components/VehiculosDelUsuario.vue';
import FormularioCliente from '@/components/FormularioCliente.vue';

const listaClientes = ref([]);
const idCliente = ref(null);
onBeforeMount(async () => {
    listaClientes.value = await getClientes();
});

function mostrarVehiculosDelUser(id) {
    idCliente.value = id;
}
</script>

<template>
    <section>
        <div>
            <div v-if="listaClientes.length === 0">
                <p>No hay clientes disponibles</p>
            </div>

            <div v-for="cliente in listaClientes" :key="cliente.id">
                <p @click="mostrarVehiculosDelUser(cliente.id)"><span>Nombre:</span> {{ cliente.nombre }} DNI: {{ cliente.dni }}</p>
            </div>
        </div>
        <VehiculosDelUsuario :idCliente="idCliente"></VehiculosDelUsuario>
        <FormularioCliente></FormularioCliente>
    </section>
</template>