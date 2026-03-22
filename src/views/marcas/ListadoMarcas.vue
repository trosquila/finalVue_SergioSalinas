<script setup>
import '../../assets/styles/global.css';
import { obtenerMarcasPorPrecioMedio, obtenerModeloConPrecio } from '../../assets/js/consultas.js';
import { onBeforeMount, ref, computed } from 'vue';

const listaMarcasOrdenadas = ref(null);
const idMarcaMostrar = ref(null);
const listaModelos = ref([]);

onBeforeMount(async () => {
    listaMarcasOrdenadas.value = await obtenerMarcasPorPrecioMedio();
    listaModelos.value = await obtenerModeloConPrecio();
});

function mostrarModelos(idMarca) {
    idMarcaMostrar.value = idMarca;
}

const listaModelosFiltrados = computed(() => {
    if (!idMarcaMostrar.value) return [];
    return listaModelos.value.filter(mod => mod.idMarca == idMarcaMostrar.value);
});
</script>

<template>
    <section>
        <h2>Listado marcas</h2>
        <table>
            <tr>
                <th>NOMBRE</th>
                <th>ORIGEN</th>
                <th>AÑO FUNDACIÓN</th>
                <th>PRECIO MEDIO</th>
            </tr>
            <tr v-for="(marca, index) in listaMarcasOrdenadas" :key="marca.id">
                <td @click="mostrarModelos(marca.id)" style="cursor: pointer;">{{ marca.nombre }}</td>
                <td>{{ marca.origen }}</td>
                <td>{{ marca.anioFundacion }}</td>
                <td>{{ marca.precioMedio }}</td>
            </tr>
        </table>
        <section v-if="idMarcaMostrar" class="modelosPanel">
            <h3 class="tituloSeccion">Modelos disponibles</h3>
            <div class="listaDatos">
                <div v-for="modelo in listaModelosFiltrados" :key="modelo.id" class="modeloFila">
                    <span class="modeloNombre">{{ modelo.modelo }}</span>
                    <span class="modeloPrecio">{{ modelo.precioDia }} €/día</span>
                </div>
            </div>
        </section>
    </section>
</template>