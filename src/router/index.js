import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "App",
    redirect: "/home",
    component: () => import("@/views/home"),
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/components/HomeMain.vue")
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/home/login")
      },
      {
        path: "register",
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
    component: () => import("@/views/member"),
    children: [
      {
        path: "profile",
        name: "MemberProfile",
        component: () => import("@/views/member/core/profile")
      },
      {
        path: "device",
        name: "MemberDevice",
        component: () => import("@/views/member/core/device")
      },
      {
        path: "courses",
        name: "MemberCourses",
        component: () => import("@/views/member/core/courses")
      },
      {
        path: "data",
        name: "MemberData",
        component: () => import("@/views/member/core/data")
      }
    ]
  },
  {
    path: "/teacher",
    name: "Teacher",
    component: () => import("@/views/teacher"),
    children: [
      {
        path: "profile",
        name: "TeacherProfile",
        component: () => import("@/views/teacher/core/profile")
      },
      {
        path: "course",
        name: "TeacherCourse",
        component: () => import("@/views/teacher/core/course")
      },
      {
        path: "member/:mid",
        name: "TeacherMember",
        component: () => import("@/views/teacher/core/member")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
