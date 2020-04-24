import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import feathers from "vue-icon";

import useAll from "./utils/useAll";

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

// import "./style/style.styl";
// import "./theme/index.css";
import {
  Form,
  FormItem,
  Input,
  Icon,
  Button,
  Radio,
  RadioGroup,
  Select,
  Option,
  Container,
  Main,
  Header,
  Footer,
  Aside,
  Row,
  Col,
  Menu,
  MenuItemGroup,
  MenuItem,
  Submenu,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Divider,
  Avatar,
  Badge,
  Popover,
  Popconfirm,
  Tooltip
} from "element-ui";
// Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };
Vue.use(Button);
Vue.use(Icon);
Vue.use(Divider);
Vue.use(Avatar);
Vue.use(Badge);

useAll(Vue, [Form, FormItem, Input, RadioGroup, Radio, Select, Option]); // form use
useAll(Vue, [Container, Main, Header, Footer, Aside]); // container use
useAll(Vue, [Col, Row]); // layout use
useAll(Vue, [Menu, MenuItemGroup, MenuItem, Submenu]); // menu use
useAll(Vue, [Dropdown, DropdownMenu, DropdownItem]);
useAll(Vue, [Tabs, TabPane]); // tab use
useAll(Vue, [Table, TableColumn]); // table use
useAll(Vue, [Popover, Popconfirm, Tooltip]); // notice use

Vue.use(feathers, "v-icon");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
