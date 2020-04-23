<template>
  <el-container direction="vertical" class="home">
    <home-header />
    <router-view />
    <home-footer />
  </el-container>
</template>

<script>
import HomeHeader from "./home/components/HomeHeader";
import HomeFooter from "./home/components/HomeFooter";
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
