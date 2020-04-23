<template>
  <div class="login-container">
    <el-form>
      <el-form-item label="Username">
        <el-input type="text"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button>Login</el-button>
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
  methods: {
    login(formData) {
      console.log("log in");
    },
    register() {
      console.log("register");
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
  &>.el-form
    padding 20px
    width 350px
    height auto
    border 2px solid black
</style>
