import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "App",
    component: () => import("@/views/home"),
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home/components/HomeMain.vue")
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/home/login")
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("@/views/home/login")
      }
    ]
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/views/test")
  },
  {
    path: "/member",
    name: "Member",
    component: () => import("@/views/member")
  },
  {
    path: "/teacher",
    name: "Teacher",
    component: () => import("@/views/teacher")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
