<template>
  <div class="login-container">
    <el-form>
      <el-form-item label="Username">
        <el-input type="text"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input type="password"></el-input>
      </el-form-item>

      <el-form-item v-if="log_type === '/register'">
        <el-radio-group>
          <el-radio></el-radio>
        </el-radio-group>
        <el-select value="123">
          <el-option value="123"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="log_type === '/login'">
        <el-button>Login</el-button>
        <p>
          Not?
          <router-link :to="{ name: 'Register', params: {} }"
            >Register</router-link
          >
        </p>
      </el-form-item>
      <el-form-item v-else-if="log_type === '/register'">
        <el-button>Register</el-button>
        <p>
          Already?
          <router-link :to="{ name: 'Login', params: {} }">Login</router-link>
        </p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {};
  },
  computed: {
    log_type: function() {
      return this.$route.path;
    }
  },
  methods: {
    login(formData) {
      console.log("log in");
    },
    register() {
      console.log("register");
    },
    getOptions() {}
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
  &>.el-select
    width 50px
</style>
