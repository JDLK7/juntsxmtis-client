import Vue from 'vue';
import Router from 'vue-router';
import Envios from '@/views/Envios';
import Reparto from '@/views/Reparto';
import Aranceles from '@/views/Aranceles';
import Vehiculos from '@/views/Vehiculos';
import Seguimiento from '@/views/Seguimiento';
import Reclamaciones from '@/views/Reclamaciones';

Vue.use(Router)

export default new Router({
  linkActiveClass: 'border-blue bg-blue hover:bg-blue-dark text-white-important',
  routes: [
    { 
      path: '/',
      redirect: '/reclamaciones'
    },
    {
      path: '/reclamaciones',
      name: 'Reclamaciones',
      component: Reclamaciones
    },
    {
      path: '/aranceles',
      name: 'Aranceles',
      component: Aranceles
    },
    {
      path: '/seguimiento',
      name: 'Seguimiento',
      component: Seguimiento
    },
    {
      path: '/reparto',
      name: 'Reparto',
      component: Reparto
    },
    {
      path: '/vehiculos',
      name: 'Vehiculos',
      component: Vehiculos
    },
    {
      path: '/envios',
      name: 'Envios',
      component: Envios
    },
  ],
});
