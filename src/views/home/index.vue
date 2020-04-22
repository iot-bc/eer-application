<template>
  <el-container direction="vertical" class="home">
    <home-header />
    <el-main>
      <img alt="Vue logo" src="../../assets/logo.png" />
      <el-row>
        <el-button size="medium" type="primary" @click="$router.push('Login')"
          >Login</el-button
        >
        <el-button
          size="medium"
          type="primary"
          @click="$router.push('/login?register=1')"
          >Register</el-button
        >
      </el-row>
    </el-main>
    <home-footer />
  </el-container>
</template>

<script>
import HomeHeader from "./components/HomeHeader";
import HomeFooter from "./components/HomeFooter";
export default {
  name: "Home",
  components: {
    HomeHeader,
    HomeFooter
  }
};
</script>
<style lang="stylus" scoped>
.home
  &>*
    border 1px solid black
  &>.el-main
    padding 100px
    &>.el-row
      margin-top 50px
      &>.el-button
        margin 20px
        font-size 30px
</style>
