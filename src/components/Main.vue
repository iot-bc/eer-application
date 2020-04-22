<template>
  <el-container class="main">
    <el-header height="75px">header</el-header>
    <el-container>
      <el-aside width="15%">aside</el-aside>
      <el-container>
        <el-main>main</el-main>
        <el-footer height="50px">footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Main",
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
  /*&>*, &>*>*, &>*>*>**/
  /*  border 1px solid black*/
  &>.el-header
    background-color: #B3C0D1;
  &>.el-container
    .el-aside
      background-color #e6a23c
    &>.el-container
      .el-main
        background-color #4d20b4
      .el-footer
        background-color alpha(black,0.1)
        position fixed
        bottom 0
        width 85%
</style>
