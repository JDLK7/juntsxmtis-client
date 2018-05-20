<template>
  <div class="tab-content">
    <h1 class="font-sans text-grey-darkest my-8">Gestión de envíos</h1>
    
    <hr>
    
    <h2 class="font-sans text-grey-darkest my-8">Introducir envío</h2>
    <div>
      <div class="flex items-center mb-4">
        <label :class="classes.label">
          Ciudad de origen
          <input v-model="ciudadOrigen" :class="classes.input" type="text" placeholder="Ej. Madrid">
        </label>
      </div>
      <div class="flex items-center mb-4">
        <label :class="classes.label">
          Ciudad de destino
          <input v-model="ciudadDestino" :class="classes.input" type="text" placeholder="Ej. Alicante">
        </label>
      </div>
      <div class="flex items-center mb-4">
        <label :class="classes.label">
          Calle de origen
          <input v-model="calleOrigen" :class="classes.input" type="text" placeholder="Ej. C/ Concepción Ávila, 3">
        </label>
      </div>
      <div class="flex items-center mb-4">
        <label :class="classes.label">
          Calle de destino
          <input v-model="calleDestino" :class="classes.input" type="text" placeholder="Ej. C/ Italia, 22">
        </label>
      </div>
      <div class="relative mb-4">
        <label :class="classes.label">
          Cliente
          <select :class="classes.select" v-model="clienteSeleccionado">
            <option v-for="cliente in clientes" :key="cliente.email" :value="cliente.email">
              {{ cliente.email }}
            </option>
          </select>
        </label>
        <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      <button @click="registrarEnvio" :class="classes.btn">
        Registrar
      </button>
    </div>

    <hr>

    <h2 class="font-sans text-grey-darkest my-8">Cambiar estado de envío</h2>
    <div class="flex items-center mb-4">
      <label :class="classes.label" style="flex: .25;">
        Envío
        <input v-model="codigoEnvio" :class="classes.input" type="number" placeholder="Código de envío">
      </label>
      <div class="relative mr-4 flex-1">
        <label :class="classes.label">
          Estado
          <select :class="classes.select" v-model="estadoSeleccionado">
            <option v-for="estado in estados" :key="estado" :value="estado">
              {{ estado | capitalize }}
            </option>
          </select>
        </label>
        <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      <button @click="registrarEnvio" :class="classes.btn">
        Actualizar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    clientes: [
      {
        email: 'josesguay@gmail.com',
      },
      {
        email: 'joaquin.anton95@gmail.com',
      },
      {
        email: 'hectorguillo96@gmail.com',
      },
    ],
    codigoEnvio: null,
    clienteSeleccionado: null,
    estadoSeleccionado: null,
    estados: ['procesando', 'despachado', 'en transito', 'en reparto', 'Entregado', 'retenido'],
    ciudadOrigen: null,
    ciudadDestino: null,
    calleOrigen: null,
    calleDestino: null,
  }),
  methods: {
    registrarEnvio() {
      console.log('Registrando envío...');
      // this.$http.get(`http://localhost:9090/flujo1`)
      // .then((response) => {

      // })
      // .catch((error) => {

      // });
    },
  },
};
</script>

