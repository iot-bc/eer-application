import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "App",
    component: () => import("@/views/Home.vue"),
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home")
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/login")
      },
      {
        path: "register",
        name: "Register",
        component: () => import("@/views/login")
      }
    ]
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/views/test")
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   component: () => import("@/views/login")
  // },
  {
    path: "/main",
    name: "Main",
    component: () => import("@/components/Main.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
