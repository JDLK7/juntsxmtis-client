<template>
  <div class="tab-content">
    <h1 class="font-sans text-grey-darkest my-8">Seguimiento de paquetes</h1>
    <div class="flex items-center">
      <label :class="classes.label">
        Paquete
        <input v-model="codigoEnvio" :class="classes.input" type="number" placeholder="Código de envío">
      </label>
      <button @click="seguirPaquete" :class="classes.btn">
        Obtener
      </button>
    </div>
    
    <template v-if="hasSeguimiento">
      <h2 class="font-sans text-grey-darkest my-8">Seguimiento</h2>
      <div class="p-4 mb-4 bg-grey-lighter">
        <div v-for="(registro, index) in seguimiento" :key="index">
          <label :class="classes.label" class="inline">
            Fecha:
            <span class="font-normal">{{ registro.fecha }}</span>
          </label>
          <label :class="classes.label" class="inline">
            Localizacion:
            <span class="font-normal">{{ registro.localizacion }}</span>
          </label>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data: () => ({
    codigoEnvio: null,
    seguimiento: [],
  }),
  computed: {
    hasSeguimiento() {
      return this.seguimiento.length > 0;
    },
  },
  methods: {
    seguirPaquete() {
      console.log('Seguimiento paquete...');

      this.$http.get(`http://localhost:9090/entradaSeguimiento?numeroTracking=${this.codigoEnvio}`)
      .then((response) => {
        this.seguimiento = response.data.seguimiento;
      })
      .catch((error) => {
        this.seguimiento = [],
        console.log('Error al obtener el seguimiento del paquete', error);

        this.$swal({
          title: 'No se encontró',
          text: 'El envío no existe o no tiene seguimiento',
          type: 'error',
        });
      });
    },
  },
};
</script>
