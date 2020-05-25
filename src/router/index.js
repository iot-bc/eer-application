import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "App",
    redirect: { name: "Home" },
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
    redirect: { name: "MemberProfile" },
    component: () => import("@/views/member"),
    children: [
      {
        path: "profile",
        name: "MemberProfile",
        component: () => import("@/views/member/profile")
      },
      {
        path: "device",
        name: "MemberDevice",
        component: () => import("@/views/member/device")
      },
      {
        path: "courses",
        name: "MemberCourses",
        component: () => import("@/views/member/courses")
      },
      {
        path: "data",
        name: "MemberData",
        component: () => import("@/views/member/data")
      }
    ]
  },
  {
    path: "/teacher",
    name: "Teacher",
    redirect: { name: "TeacherProfile" },
    component: () => import("@/views/teacher"),
    children: [
      {
        path: "profile",
        name: "TeacherProfile",
        component: () => import("@/views/teacher/profile")
      },
      {
        path: "course",
        name: "TeacherCourse",
        component: () => import("@/views/teacher/course")
      },
      {
        path: "member/:mid",
        name: "TeacherMember",
        component: () => import("@/views/teacher/member")
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
