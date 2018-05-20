<template>
  <div id="app">
    <div class="container mx-auto max-w-x1 shadow-lg mt-8 p-8">

      <navbar/>

      <router-view/>

    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: 'App',
  components: {
    navbar: Navbar,
  },
};
</script>

<style>
.text-white-important {
  color: #fff !important;
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
