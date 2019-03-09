import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import store from './store/index';
import '../node_modules/materialize-css/';
import '../node_modules/materialize-css/dist/css/materialize.css';


Vue.config.productionTip = false;
Vue.use(Vuex);
const vuexStore = new Vuex.Store(store);

new Vue({
  store: vuexStore,
  render: h => h(App),
}).$mount('#app');
