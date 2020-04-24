<template>
  <div class="main-side-bar">
    <side-general></side-general>
    <el-divider />
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
  overflow hidden
</style>
