<template>
  <div class="tab-content">
    <h1 class="font-sans text-grey-darkest my-8">Reparto a domicilio</h1>
    <div>
      <div class="flex items-center mb-4">
        <label :class="classes.label">
          Envío
          <input v-model="codigoEnvio" :class="classes.input" type="number" placeholder="Código de envío">
        </label>
      </div>
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
          <select :class="classes.select" v-model="cliente">
            <option v-for="cliente in clientes" :key="cliente.email" :value="cliente.email">
              {{ cliente.email }}
            </option>
          </select>
        </label>
        <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      <button @click="repartir" :class="classes.btn">
        Repartir
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    codigoEnvio: null,
    cliente: null,
    ciudadOrigen: null,
    ciudadDestino: null,
    calleOrigen: null,
    calleDestino: null,
  }),
  methods: {
    repartir() {
      console.log('Repartir...');

      this.$http.get(`http://localhost:9090/envio?numeroTracking=${codigoEnvio}`, {
        origen,
        destino,
        calleOrigen,
        calleDestino,
        cliente
      })
      .then((response) => {
        this.$swal({
          title: 'Reparto en proceso',
          text: response.body.mensaje,
          type: 'success',
        });
      });
    },
  },
};
</script>