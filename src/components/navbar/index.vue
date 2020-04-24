<template>
  <div class="main-nav-bar">
    <nav-logo />
    <nav-search />
    <nav-user />
    <el-divider direction="vertical"></el-divider>
    <nav-message />
  </div>
</template>

<script>
import NavLogo from "./components/NavLogo";
import NavSearch from "./components/NavSearch";
import NavMessage from "./components/NavMessage";
import NavUser from "./components/NavUser";
export default {
  name: "NavBar",
  components: { NavUser, NavMessage, NavSearch, NavLogo }
};
</script>

<style lang="stylus" scoped>
.main-nav-bar
  width 100%
  height 100%
  padding 1px

  &>.main-nav-logo
    width 180px
    float left
  &>.main-nav-search
    width auto
    float left
    line-height $nav-height
  &>.main-nav-message
    margin-top 1.8rem
    margin-right 1.5rem
    color white
    width auto
    float right
  &>.el-divider
    float right
    height ($nav-height - 40px)
    margin-top 22px
  &>.main-nav-user
    width 200px
    float right
    line-height $nav-height
</style>
