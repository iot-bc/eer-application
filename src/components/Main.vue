<template>
  <el-container class="main">
    <el-header height="75px">
      <nav-bar></nav-bar>
    </el-header>
    <el-container>
      <el-aside width="180px">
        <side-bar></side-bar>
      </el-aside>
      <el-main>main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavBar from "./navbar/index";
import SideBar from "./sidebar/index";
export default {
  name: "Main",
  components: { SideBar, NavBar },
  props: {
    msg: String
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

.main
  border 1px solid navajowhite
  overflow-y hidden
  /*&>*, &>*>*, &>*>*>**/
  /*  border 1px solid black*/
  &>.el-header
    background-color: $color
    padding 0 5px
  &>.el-container
    .el-aside
      background-color white
      overflow-y hidden
    .el-main
      background-color white
</style>
