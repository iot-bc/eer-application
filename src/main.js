import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

import useAll from "./utils/useAll";

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

// import "./theme/index.css";
import {
  Form,
  FormItem,
  Input,
  Button,
  Container,
  Main,
  Header,
  Footer,
  Aside,
  Menu,
  MenuItem,
  Submenu,
  Tabs,
  TabPane
} from "element-ui";
Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };
Vue.use(Button);
useAll(Vue, [Form, FormItem, Input]); // form use
useAll(Vue, [Container, Main, Header, Footer, Aside]); // container use
useAll(Vue, [Menu, MenuItem, Submenu]); // menu use
useAll(Vue, [Tabs, TabPane]); // tab use

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
