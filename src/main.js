import Vue from 'vue';
import VueResource from "vue-resource";
import VueRouter from "vue-router";

import { routes } from "./routes";
import App from './App.vue';

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes, // short for `routes: routes`
  mode: "history"
});

Vue.http.options.root = 'https://vue-http-add0e.firebaseio.com/data.json';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
