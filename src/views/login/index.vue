<template>
  <div class="login-container">
    <el-form>
      <el-form-item label="Username">
        <el-input type="text"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input type="password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style scoped lang="stylus">
.login-container
  width 600px
  height 300px
  border 2px saddlebrown solid
</style>
