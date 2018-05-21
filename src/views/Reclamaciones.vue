<template>
  <div class="tab-content my-8">
    <h1 class="font-sans text-grey-darkest my-8">Reclamación por pérdida</h1>

    <div class="flex items-center mb-4">
      <label :class="classes.label">
        Proceso de reclamación
        <input v-model="codigoEnvio" :class="classes.input" type="number" placeholder="Código de envío">
      </label>
      <button @click="emitirReclamacion" :class="classes.btn">
        Enviar
      </button>
    </div>

    <div v-if="hasReclamacion" class="p-4 mb-4 bg-grey-lighter">
      <label :class="classes.label">
        Estado reclamacion:
        <span class="font-normal">{{ reclamacion.estadoReclamacion }}</span>
      </label>
      <label :class="classes.label">
        Atendida:
        <span class="font-normal">{{ reclamacion.atendida }}</span>
      </label>
      <label :class="classes.label">
        Pagada:
        <span class="font-normal">{{ reclamacion.pagada }}</span>
      </label>
      <label :class="classes.label">
        ID reclamación:
        <span class="font-normal">{{ reclamacion.idReclamacion }}</span>
      </label>
    </div>

    <!-- <div class="p-4 mb-4 bg-grey-lighter">
      <label :class="classes.label">
        ID reclamación:
        <span class="font-normal">{{ idNuevaReclamacion }}</span>
      </label>
    </div>

    <div class="flex items-center mb-4">
      <label :class="classes.label">
        Ver datos reclamación
        <input v-model="idReclamacion" :class="classes.input" type="number" placeholder="ID reclamación">
      </label>
      <button @click="verReclamacion" :class="classes.btn">
        Ver
      </button>
    </div>
    <div v-if="hasReclamacion" class="p-4 mb-4 bg-grey-lighter">
      <label :class="classes.label">
        Codigo de envio:
        <span class="font-normal">{{ reclamacion.codigoEnvio }}</span>
      </label>
      <label :class="classes.label">
        Nombre:
        <span class="font-normal">{{ reclamacion.nombre }}</span>
      </label>
      <label :class="classes.label">
        Apellidos:
        <span class="font-normal">{{ reclamacion.apellidos }}</span>
      </label>
      <label :class="classes.label">
        Email:
        <span class="font-normal">{{ reclamacion.email }}</span>
      </label>
      <label :class="classes.label">
        Teléfono:
        <span class="font-normal">{{ reclamacion.telefono }}</span>
      </label>
      <label :class="classes.label">
        Descripción:
        <span class="font-normal">{{ reclamacion.descripcion }}</span>
      </label>
      <label :class="classes.label">
        Atendida:
        <span class="font-normal">{{ reclamacion.atendida }}</span>
      </label>
      <label :class="classes.label">
        Estado:
        <span class="font-normal">{{ reclamacion.estado }}</span>
      </label>
      <label :class="classes.label">
        Tipo de envio:
        <span class="font-normal">{{ reclamacion.tipoEnvio }}</span>
      </label>
    </div>

    <div class="flex items-center mb-4">
      <label :class="classes.label">
        Pagar indemnización
        <input v-model="codigoEnvio" :class="classes.input" type="number" placeholder="Código de envío">
      </label>
      <button @click="pagarIndemnizacion" :class="classes.btn">
        Pagar
      </button>
    </div> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    codigoEnvio: null,
    reclamacion: null,
  }),
  computed: {
    hasReclamacion() {
      return this.reclamacion !== null;
    }
  },
  methods: {
    emitirReclamacion() {
      this.$http.post('http://localhost:9090/reclamacion', {
        idEnvio: this.codigoEnvio,
      })
      .then((response) => {
        if (parseInt(response.data.idReclamacion) === -1) {
          this.reclamacion = null;

          this.$swal({
            title: 'No se encontró',
            text: response.data.message,
            type: 'error',
          });
        } else {
          this.reclamacion = response.data;
        }
      });
    },
  },
};
</script>