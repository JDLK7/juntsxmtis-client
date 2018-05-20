
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import axios from 'axios';
import router from './router';
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2);

Vue.config.productionTip = false;
Vue.http = Vue.prototype.$http = axios;

Vue.mixin({
  data: function() {
    return {
      get classes() {
        return {
          label: 'block text-grey-darker text-sm font-bold mb-2 mr-2 w-full',
          input: 'shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker',
          select: 'block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded',
          btn: 'flex-no-shrink bg-blue hover:bg-blue-light text-white font-bold py-2 px-4 border-b-4 border-blue-dark hover:border-blue rounded w-32',
          link: 'h-full flex items-center text-center block border border-white rounded hover:border-grey-lighter text-blue hover:bg-grey-lighter py-2 px-4 no-underline',
        };
      }
    }
  }
});

Vue.filter('capitalize', (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // data: () => ({

  // }),
});
