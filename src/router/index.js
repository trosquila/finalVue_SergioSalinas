import { createRouter, createWebHistory } from 'vue-router'

import Inicio from '@/views/Inicio.vue'

import ListaClientes from '@/views/clientes/ListaClientes.vue'
import ListadoMarcas from '@/views/marcas/ListadoMarcas.vue'
import NuevaMarca from '@/views/marcas/NuevaMarca.vue'
import NuevoModelo from '@/views/marcas/NuevoModelo.vue'
import AlquilerVehiculo from '@/views/vehiculos/AlquilerVehiculo.vue'
import ListadoVehiculos from '@/views/vehiculos/ListadoVehiculos.vue'
import NuevoVehiculo from '@/views/vehiculos/NuevoVehiculo.vue'
import Modelos from '@/views/marcas/Modelos.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: Inicio,
    },
    {
      path: '/clientes',
      name: 'listaClientes',
      component: ListaClientes,
    },
    {
      path: '/marcas',
      name: 'listadoMarcas',
      component: ListadoMarcas,
    },
    {
      path: '/marcas/nueva',
      name: 'nuevaMarca',
      component: NuevaMarca,
    },
    {
      path: '/marcas/modelo/nuevo',
      name: 'nuevoModelo',
      component: NuevoModelo,
    },
    {
      path: '/marcas/modelo',
      name: 'modelos',
      component: Modelos,
    },
    {
      path: '/vehiculos',
      name: 'listadoVehiculos',
      component: ListadoVehiculos,
    },
    {
      path: '/vehiculos/nuevo',
      name: 'nuevoVehiculo',
      component: NuevoVehiculo,
    },
    {
      path: '/vehiculos/alquiler',
      name: 'alquilerVehiculo',
      component: AlquilerVehiculo,
    },
  ],
})

export default router