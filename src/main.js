import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Paginate from "vuejs-paginate";

Vue.config.productionTip = false;
Vue.component("paginate", Paginate);
new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
