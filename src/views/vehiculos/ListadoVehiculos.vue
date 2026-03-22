<script setup>
import { getMarcas, modeloDeMarcaConcreta, obtenerVehiculosConClientes, guardarNuevoVehiculo } from '../../assets/js/consultas.js';
import { onBeforeMount, ref, watch } from 'vue';

const listaMarcas = ref(null);
const listaModelos = ref(null);

const marcaSeleccionada = ref(null);
const modeloSeleccionado = ref(null);

const listaVehiculos = ref([]);
const verFormNuevoVehi = ref(false);

const listaModelosForm = ref([]);
const marcaSeleccionadaForm = ref(null);

const datosForm = ref({
    idModelo: null,
    precioDia: null,
    puertas: null,
    sillaInfantil: false
});

onBeforeMount(async () => {
    listaMarcas.value = await getMarcas();
    await cargarVehiculos();

    marcaSeleccionadaForm.value = marcaSeleccionada.value ? marcaSeleccionada.value : null;
    datosForm.value.idModelo = modeloSeleccionado.value ? modeloSeleccionado.value : null;

    if (marcaSeleccionadaForm.value) {
        listaModelosForm.value = await modeloDeMarcaConcreta(marcaSeleccionadaForm.value);
    }
})

watch(
    () => marcaSeleccionada.value,
    async (nuevaMarca) => {
        await cargarVehiculos();

        marcaSeleccionadaForm.value = nuevaMarca ? nuevaMarca : null;

        if (marcaSeleccionadaForm.value) {
            listaModelosForm.value = await modeloDeMarcaConcreta(marcaSeleccionadaForm.value);
        } else {
            listaModelosForm.value = [];
            datosForm.value.idModelo = null;
        }
    }
);

watch(
    () => modeloSeleccionado.value,
    async (nuevoModelo) => {
        await cargarVehiculos();
        datosForm.value.idModelo = nuevoModelo ? nuevoModelo : null;
    }
);

async function elegirModelos() {
    const marca = marcaSeleccionada.value;
    listaModelos.value = await modeloDeMarcaConcreta(marca);
    modeloSeleccionado.value = null;
}

async function cargarVehiculos() {
    listaVehiculos.value = await obtenerVehiculosConClientes(marcaSeleccionada.value, modeloSeleccionado.value);
}

function crearNuevoVehiculo() {
    verFormNuevoVehi.value ? verFormNuevoVehi.value = false : verFormNuevoVehi.value = true;
}

async function elegirModelosForm() {
    const marca = marcaSeleccionadaForm.value;
    listaModelosForm.value = await modeloDeMarcaConcreta(marca);
    datosForm.value.idModelo = null;
}

async function nuevoVehiculo() {
    await guardarNuevoVehiculo(datosForm.value);
    await cargarVehiculos();
    verFormNuevoVehi.value = false;
    datosForm.value = {
        idModelo: datosForm.value.idModelo,
        precioDia: null,
        puertas: null,
        sillaInfantil: false
    }

}
</script>

<template>
    <section class="contenedor">
        <h2>Listado vehiculos</h2>
        <div>
            <div>
                <label for="">Marcas</label>
                <select name="" id="" v-model="marcaSeleccionada" @change="elegirModelos()">
                    <option v-for="(marca, index) in listaMarcas" :key="index" :value="marca.id">{{ marca.nombre }}</option>
                </select>    
            </div>
            <div>
                <label for="">Modelos</label>
                <select v-show="!listaModelos" name="" id="" disabled>
                    <option value="">No hay modelos disponibles de esta marca</option>
                </select>
                <select v-show="listaModelos" name="" id="" v-model="modeloSeleccionado">
                    <option v-for="(modelo, index) in listaModelos" :key="index" :value="modelo.id" >{{ modelo.modelo }}</option>
                </select>    
            </div>
        </div>

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
            <button class="btnSecundario" v-show="verFormNuevoVehi === true" @click="crearNuevoVehiculo()">Cancelar</button>

            <div v-show="verFormNuevoVehi">
                <section>
                    <form action="" class="formulario">
                        <div class="contenidoForm">
                            <label for="">Marca</label>
                            <select v-model="marcaSeleccionadaForm" @change="elegirModelosForm()" :disabled="marcaSeleccionada">
                                <option v-for="(marca, index) in listaMarcas" :key="index" :value="marca.id">
                                    {{ marca.nombre }}
                                </option>
                            </select>
                        </div>

                        <div class="contenidoForm">
                            <label for="">Modelo</label>
                            <select v-model="datosForm.idModelo" :disabled="modeloSeleccionado">
                                <option v-for="(modelo, index) in listaModelosForm" :key="index" :value="modelo.id">
                                    {{ modelo.modelo }}
                                </option>
                            </select>
                        </div>

                        <div class="contenidoForm">
                            <label for="">Precio por día</label>
                            <input type="number" v-model="datosForm.precioDia">
                        </div>

                        <div class="contenidoForm">
                            <label for="">Número de puertas</label>
                            <input type="number" v-model="datosForm.puertas">
                        </div>

                        <div class="contenidoForm">
                            <label for="">¿Contiene una silla infantil?</label>
                            <input type="checkbox" v-model="datosForm.sillaInfantil">
                        </div>

                        <div class="accionesForm">
                            <button class="btnPrincipal" @click.prevent="nuevoVehiculo()">Guardar nuevo vehículo</button>
                        </div>
                    </form>
                </section>
            </div>
        </section>
    </section>
</template>