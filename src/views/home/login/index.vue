<template>
  <div class="login-container">
    <el-form>
      <h2>{{ log_type.substr(1, 1).toUpperCase() + log_type.slice(2) }}</h2>

      <el-form-item label="Username">
        <el-input
          prefix-icon="el-icon-user"
          class="form-input"
          v-model="username"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          prefix-icon="el-icon-lock"
          class="form-input"
          v-model="password"
          type="password"
        ></el-input>
      </el-form-item>

      <el-form-item v-if="log_type === '/register'">
        <el-radio-group v-model="select">
          <el-radio v-for="type in types" :label="type" :key="type"></el-radio>
        </el-radio-group>
        <el-input
          v-model="orgCode"
          placeholder="org code"
          prefix-icon="el-icon-office-building"
          type="text"
        ></el-input>
      </el-form-item>

      <el-form-item v-if="log_type === '/login'">
        <el-button @click="login">Login</el-button>
        <el-divider></el-divider>
        <p>
          Don't have an account yet? <el-divider direction="vertical" />
          <router-link :to="{ name: 'Register' }">Register</router-link>
        </p>
      </el-form-item>
      <el-form-item v-else-if="log_type === '/register'">
        <el-button @click="register">Register</el-button>
        <el-divider></el-divider>
        <p>
          Already have an account? <el-divider direction="vertical" />
          <router-link :to="{ name: 'Login', params: {} }">Login</router-link>
        </p>
      </el-form-item>
      {{ $route.params }}
    </el-form>
  </div>
</template>

<script>
import { Notification } from "element-ui";
export default {
  name: "Login",
  data() {
    return {
      types: ["Member", "Teacher"],
      username: "",
      password: "",
      select: "Member",
      orgCode: ""
    };
  },
  computed: {
    log_type: function() {
      return this.$route.path;
    }
  },
  methods: {
    async login() {
      let data = await this.$axios
        .post("/api/login", {
          username: this.username,
          password: this.password
        })
        .then(res => res.data);
      Notification({
        title: "Login",
        message: data.msg,
        type: data.code ? "success" : "error",
        duration: 3000
      });
      if (data.code) {
        let id = data.data[0];
        let type = data.data[1];
        await this.$store.dispatch("login", {
          id: id,
          name: this.username,
          type: type
        });
        setTimeout(
          () =>
            this.$router.push({
              name: type.replace(type[0], type[0].toUpperCase())
            }),
          1000
        );
      }
    },
    async register() {
      let data = await this.$axios
        .post("/api/register", {
          username: this.username,
          password: this.password,
          type: this.select.toLowerCase(),
          orgCode: this.orgCode
        })
        .then(res => res.data);
      Notification({
        title: "Register",
        message: data.msg,
        type: data.code ? "success" : "error",
        duration: 3000
      });
      if (data.code) {
        // cookie
        setTimeout(() => this.$router.push({ name: "Login" }), 1500);
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.login-container
  margin-left 10%
  width 80%
  height 100%
  display flex
  justify-content center
  align-items center
.el-form
  padding 20px
  width 350px
  border 2px solid black

/*h2+.el-form-item*/
/*  width 200px*/
/*  margin-left 75px*/
/*  &+.el-form-item*/
/*    width 200px*/
/*    margin-left 75px*/


.el-radio-group
  width 60%
  &>.el-radio
    width 45%
    margin-right 5px
    display inline-block
  &+.el-input
    width 35%
</style>
