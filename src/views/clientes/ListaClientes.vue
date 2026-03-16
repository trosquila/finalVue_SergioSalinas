<script setup>
import '../../assets/styles/global.css';
import { getClientes } from '../../assets/js/consultas.js';
import { onBeforeMount, ref } from 'vue';

const listaClientes = ref([]);

onBeforeMount(async () => {
    listaClientes.value = await getClientes();
});
</script>

<template>
    <section>
        <div>
            <div v-if="listaClientes.length === 0">
                <p>No hay clientes disponibles</p>
            </div>

            <div v-for="cliente in listaClientes" :key="cliente.id">
                <p><span>Nombre:</span> {{ cliente.nombre }} DNI: {{ cliente.dni }}</p>
            </div>
        </div>
        
    </section>
</template>