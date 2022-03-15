import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { router } from "./router"

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

Vue.component('v-select', vSelect)

import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://api2.binance.com/"
});

Vue.prototype.$axios = axiosInstance;

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
