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
        component: () => import("@/views/member/profile"),
        meta: {
          isLogin: true,
          type: "member"
        }
      },
      {
        path: "device",
        name: "MemberDevice",
        component: () => import("@/views/member/device"),
        meta: {
          isLogin: true,
          type: "member"
        }
      },
      {
        path: "courses",
        name: "MemberCourses",
        component: () => import("@/views/member/courses"),
        meta: {
          isLogin: true,
          type: "member"
        }
      },
      {
        path: "data",
        name: "MemberData",
        component: () => import("@/views/member/data"),
        meta: {
          isLogin: true,
          type: "member"
        }
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
        component: () => import("@/views/teacher/profile"),
        meta: {
          isLogin: true,
          type: "teacher"
        }
      },
      {
        path: "course",
        name: "TeacherCourse",
        component: () => import("@/views/teacher/course"),
        meta: {
          isLogin: true,
          type: "teacher"
        }
      },
      {
        path: "member/:mid",
        name: "TeacherMember",
        component: () => import("@/views/teacher/member"),
        meta: {
          isLogin: true,
          type: "teacher"
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    if (sessionStorage.getItem("login") === "TRUE") {
      let type = sessionStorage.getItem("type");
      if (type !== to.path.split("/")[1]) {
        alert("Not allowed to visit this page");
        next(false);
      } else next();
    } else {
      alert("You need to login fisrt!");
      next(false);
    }
  } else {
    if (sessionStorage.getItem("login") === "TRUE") {
      let type = sessionStorage.getItem("type").toLocaleUpperCase();
      next({ name: type.replace(type[0], type[0].toUpperCase()) });
    } else next();
  }
});

export default router;
