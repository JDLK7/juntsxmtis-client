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
          <input v-model="cliente" :class="classes.input" type="text" placeholder="ej@ejemplo.com">
        </label>
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

      this.$http.post(`http://localhost:9090/envio?numeroTracking=${this.codigoEnvio}`, {
        origen: this.ciudadOrigen,
        destino: this.ciudadDestino,
        calleOrigen: this.calleOrigen,
        calleDestino: this.calleDestino,
        cliente: this.cliente,
      })
      .then((response) => {
        this.$swal({
          title: 'Reparto en proceso',
          text: response.data.mensaje,
          type: 'success',
        });
      });
    },
  },
};
</script>