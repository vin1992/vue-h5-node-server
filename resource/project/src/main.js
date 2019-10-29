import Vue from "vue";
import App from "./App.vue";
import registerCom from "@fe/builder-components";
import router from "./routes";

// debugger;
registerCom(Vue);
console.log(registerCom);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#root");
