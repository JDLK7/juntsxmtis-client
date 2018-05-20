<template>
  <ul class="list-reset flex mb-8">
    <li class="flex-1 mr-2">
      <router-link :class="classes.link" to="reclamaciones">
        Reclamación por pérdida
      </router-link>
    </li>
    <li class="flex-1 mr-2">
      <router-link :class="classes.link" to="aranceles">
        Proceso de gestión de aranceles
      </router-link>
    </li>
    <li class="flex-1 mr-2">
      <router-link :class="classes.link" to="seguimiento">
        Seguimiento de paquetes
      </router-link>
    </li>
    <li class="flex-1 mr-2">
      <router-link :class="classes.link" to="reparto">
        Reparto a domicilio
      </router-link>
    </li>
    <li class="flex-1">
      <router-link :class="classes.link" to="vehiculos">
        Gestión de vehículos
      </router-link>
    </li>
    <li class="flex-1">
      <router-link :class="classes.link" to="envios">
        Gestión de envíos
      </router-link>
    </li>
  </ul>
</template>
