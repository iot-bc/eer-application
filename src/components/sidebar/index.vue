<template>
  <div class="main-side-bar">
    <side-general></side-general>
  </div>
</template>

<script>
import SideGeneral from "./components/SideGeneral";
export default {
  name: "SideBar",
  components: { SideGeneral }
};
</script>

<style lang="stylus" scoped>
.main-side-bar
  overflow hidden
</style>
