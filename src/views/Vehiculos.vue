<template>
  <div class="tab-content">
    <h1 class="font-sans text-grey-darkest my-8">Gestión de vehículos</h1>
    <div class="mb-4">
      <div class="relative mb-4">
        <label :class="classes.label">
          Seleccionar vehículo
          <template v-if="hasVehiculos">
            <select :class="classes.select" v-model="seleccionado" @change="estadoVehiculo">
              <option :value="null">Seleccionar vehiculo</option>
              <option v-for="vehiculo in vehiculos" :key="vehiculo.id" :value="vehiculo">
                {{ vehiculo.marca }} {{ vehiculo.modelo }} ({{ vehiculo.matricula }})
              </option>
            </select>
          </template>

          <div v-else :class="classes.select">
            No hay vehiculos registrados
          </div>

        </label>
        <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>

      <button @click="seleccionarVehiculo" :class="classes.btn">
        Seleccionar
      </button>
    </div>
    <div>
      <div class="relative mb-4">
        <label :class="classes.label">
          Informar de avería
          <template v-if="hasVehiculos">
            <select :class="classes.select" v-model="seleccionado">
              <option :value="null">Seleccionar vehiculo</option>
              <option v-for="vehiculo in vehiculos" :key="vehiculo.id" :value="vehiculo">
                {{ vehiculo.marca }} {{ vehiculo.modelo }} ({{ vehiculo.matricula }})
              </option>
            </select>
          </template>

          <div v-else :class="classes.select">
            No hay vehiculos registrados
          </div>

        </label>
        <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>

      <button @click="informarAveria" :class="classes.btn">
        Informar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    vehiculos: [],
    seleccionado: null,
  }),
  computed: {
    hasVehiculos() {
      return this.vehiculos.length > 0;
    },
  },
  beforeMount() {
    this.getVehiculos();
  },
  methods: {
    getVehiculos() {
      console.log('Obteniendo vehiculos...');

      this.$http.get('http://localhost:9095/api/vehiculos')
      .then((response) => {
        this.vehiculos = response.data.vehiculos;
      })
      .catch((error) => {
        console.log('Error al obtener los vehiculos del API Kit');
      });
    },
    estadoVehiculo() {
      this.$http.get(`${this.baseUrl}/vehiculos?idVehiculo=${this.seleccionado.id}`)
      .then((response) => {
        this.seleccionado.estado = response.data.estado;
      })
      .catch((error) => {
        console.log('Error al obtener el estado del vehiculo del API Kit');
      });
    },
    seleccionarVehiculo() {
      console.log('Seleccionando vehiculo...');

      const estado = this.seleccionado.estado;

      if (estado === 'A') {
        this.$swal({
          title: 'Vehículo averiado',
          text: '¿Desea enviar el vehículo a reparar?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#38C172',
          cancelButtonColor: '#E3342F',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.value) {
            console.log('Enviando vehiculo a reparar...');

            this.$http.get(`${this.baseUrl}/enviarVehiculo?idVehiculo=${this.seleccionado.id}&estado=D`)
            .then((response) => {
              this.$swal({
                title: 'Vehículo enviado',
                text: 'El vehículo se dirigirá al taller pronto.',
                type: 'success',
              });
            })
            .catch((error) => {
              console.log('Error al enviar el vehiculo a reparar');
            });
          }
        });
      }
      else {
        this.$swal(
          'Vehículo en buen estado',
          'El vehículo se encuentra en buen estado para realizar repartos.',
          'success'
        );
      }
    },
    informarAveria() {
      this.$http.put(`${this.baseUrl}/estado?idVehiculo=${this.seleccionado.id}&estado=A`)
      .then((response) => {
        this.seleccionado.estado = 'A';

        this.$swal({
          title: 'Informe de avería',
          text: 'El vehículo se ha marcado como averiado',
          type: 'success',
        });
      });
    }
  },
};
</script>
