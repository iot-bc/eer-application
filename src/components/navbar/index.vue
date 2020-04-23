<template>
  <div class="main-nav-bar">
    <nav-logo />
    <nav-search />
    side bar
  </div>
</template>

<script>
import NavLogo from "./components/NavLogo";
import NavSearch from "./components/NavSearch";
export default {
  name: "NavBar",
  components: { NavSearch, NavLogo }
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
</style>
