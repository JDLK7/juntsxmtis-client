<template>
  <div class="tab-content">
    <h1 class="font-sans text-grey-darkest my-8">Proceso de gestión de aranceles</h1>
    <div class="flex items-center">
      <label :class="classes.label">
        Comprobar retención
        <div class="flex">
          <input v-model="codigoEnvio" class="flex-1 mr-1" :class="classes.input" type="number" placeholder="Código de Envío">
          <input v-model="precioAranceles" class="flex-1 ml-1" :class="classes.input" type="number" placeholder="Precio de Aranceles">
        </div>
      </label>
      <button @click="comprobarRetencion" :class="classes.btn">
        Comprobar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    codigoEnvio: null,
    precioAranceles: null,
    labelClasses: 'block text-grey-darker text-sm font-bold mb-2 mr-2 w-full',
    inputClasses: 'shadow appearance-none border rounded py-2 px-3 text-grey-darker',
    btnClasses: 'flex-no-shrink bg-blue hover:bg-blue-light text-white font-bold py-2 px-4 border-b-4 border-blue-dark hover:border-blue rounded w-32',
  }),
  methods: {
    comprobarRetencion() {
      console.log('Comprobando retencion...');

      this.$http.post('http://localhost:9090/aranceles', {
        idEnvio: codigoEnvio,
        cantidadPagar: precioAranceles,
      })
      .then((response) => {
        this.$swal(
          'Estado de aranceles',
          response.body.message,
          'success'
        );
      })
      .catch((error) => {
        console.log('Error al obtener la informacion de aduanas del paquete');
      });
    },
  },
};
</script>
