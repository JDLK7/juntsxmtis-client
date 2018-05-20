<template>
  <div class="tab-content">
    <h1 class="font-sans text-grey-darkest my-8">Gestión de vehículos</h1>
    <div>
      <div class="relative mb-4">
        <label :class="classes.label">
          Seleccionar vehículo
          <select :class="classes.select">
            <option v-for="vehiculo in vehiculos" :key="vehiculo.id" :value="vehiculo.id">
              {{ vehiculo.marca }} {{ vehiculo.modelo }} ({{ vehiculo.matricula }})
            </option>
          </select>
        </label>
        <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>

      <button @click="seleccionarVehiculo" :class="classes.btn">
        Seleccionar
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
  beforeMount() {
    this.getVehiculos();
  },
  methods: {
    getVehiculos() {
      console.log('Obteniendo vehiculos...');

      this.$http.get('http://localhost:9095/api/vehiculos')
      .then((response) => {
        this.vehiculos = response.body.vehiculos;
      })
      .catch((error) => {
        console.log('Error al obtener los vehiculos del API Kit');
      });
    },
    seleccionarVehiculo() {
      console.log('Seleccionando vehiculo...');

      const estado = 'D';

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

            this.$http.get('http://localhost:9090/enviarVehiculo?idVehiculo=1&estado=D')
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
  },
};
</script>
