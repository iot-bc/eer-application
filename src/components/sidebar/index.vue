<template>
  <div class="main-side-bar">
    <h2>General</h2>
    <side-general></side-general>
    <side-widget></side-widget>
  </div>
</template>

<script>
import SideGeneral from "./components/SideGeneral";
import SideWidget from "./components/SideWidget";
export default {
  name: "SideBar",
  components: { SideWidget, SideGeneral }
};
</script>

<style lang="stylus" scoped>
.main-side-bar
  width 100%
  height 100%
  &>.main-side-general
    max-height 450px
    overflow hidden
    overflow-y scroll
    &::-webkit-scrollbar
      width 0
  &>.main-side-widget
    width $side-width
    position absolute
    bottom 0
</style>
