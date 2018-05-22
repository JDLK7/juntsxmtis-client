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

          <template v-if="hasClientes">
            <select :class="classes.select" v-model="cliente">
              <option :value="null">Seleccionar cliente</option>
              <option v-for="cli in clientes" :key="cli.email" :value="cli">
                {{ cli.nombre }} {{ cli.apellidos }} ({{ cli.email }})
              </option>
            </select>
            <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </template>

          <div v-else :class="classes.select">
            No hay clientes registrados
          </div>

        </label>
      </div>

      <button @click="envio" :disabled="!formCompleto" :class="[ formCompleto ? classes.btn : classes.btnDisabled ]">
        Procesar
      </button>

      <hr>

      <h2 class="font-sans text-grey-darkest my-8">Proceso de reparto</h2>
      <div class="flex items-center mb-4">
        <label :class="classes.label">
          Envío
          <input v-model="codigoEnvio" :class="classes.input" type="number" placeholder="Código de envío">
        </label>
        <button @click="repartir" :class="classes.btn">
          Repartir
        </button>
      </div>

      <hr>

      <h2 class="font-sans text-grey-darkest my-8">Proceso de entrega</h2>
      <div class="flex items-center mb-4">
        <label :class="classes.label">
          Envío
          <input v-model="codigoEnvio" :class="classes.input" type="number" placeholder="Código de envío">
        </label>
        <button @click="entregar" :class="classes.btn">
          Entregar
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    clientes: [],
    codigoEnvio: null,
    cliente: null,
    ciudadOrigen: null,
    ciudadDestino: null,
    calleOrigen: null,
    calleDestino: null,
  }),
  computed: {
    hasClientes() {
      return this.clientes.length > 0;
    },
    formCompleto() {
      return this.cliente && this.codigoEnvio && this.ciudadOrigen && this.ciudadDestino && this.calleOrigen && this.calleDestino;
    }
  },
  beforeMount() {
    this.getClientes();
  },
  methods: {
    envio() {
      this.$http.post(`${this.baseUrl}/envio?numeroTracking=${this.codigoEnvio}`, {
        origen: this.ciudadOrigen,
        destino: this.ciudadDestino,
        calleOrigen: this.calleOrigen,
        calleDestino: this.calleDestino,
        cliente: this.cliente,
      })
      .then((response) => {
        this.$swal({
          title: 'Proceso de envio',
          text: 'Proceso de envio empezado correctamente',
          type: 'success',
        });
      });
    },
    repartir() {
      this.$http.put(`${this.baseUrl}/reparto?entrada=true&numeroTracking=${this.codigoEnvio}`)
      .then((response) => {
        this.$swal({
          title: 'Paquete en reparto',
          text: 'El paquete se encuentra en reparto',
          type: 'success',
        });
      });
    },
    entregar() {
      this.$http.put(`${this.baseUrl}/entrega?entregado=true&numeroTracking=${this.codigoEnvio}`)
      .then((response) => {
        this.$swal({
          title: 'Paquete entregado',
          text: 'El paquete se ha entregado correctamente',
          type: 'success',
        });
      });
    },
    getClientes() {
      this.$http.get('http://localhost:9095/api/clientes')
      .then((response) => {
        this.clientes = response.data;
      });
    },
  },
};
</script>