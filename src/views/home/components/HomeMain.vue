<template>
  <el-main>
    <img alt="Vue logo" src="../../../assets/logo.png" />
    <el-row>
      <el-button
        size="medium"
        type="primary"
        @click="$router.push({ name: 'Login' })"
        >Login</el-button
      >
      <el-button
        size="medium"
        type="primary"
        @click="$router.push({ name: 'Register' })"
        >Register</el-button
      >
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: "HomeMain"
};
</script>

<style lang="stylus" scoped>
.el-main
  padding 100px
  &>.el-row
    margin-top 50px
    &>.el-button
      margin 20px
      font-size 30px
</style>
