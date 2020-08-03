import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Axios from 'axios';
import VueKinesis from 'vue-kinesis';

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.use(Vuelidate);
Vue.use(VueKinesis);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
