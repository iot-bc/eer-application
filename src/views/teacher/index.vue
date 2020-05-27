<template>
  <el-container class="main">
    <el-header height="75px">
      <nav-bar></nav-bar>
    </el-header>
    <el-container>
      <el-aside width="180px">
        <side-bar></side-bar>
      </el-aside>
      <el-main>
        <router-view />
        <!--        <p class="temp-link">-->
        <!--          <router-link :to="{ name: 'TeacherProfile' }">Profile</router-link> |-->
        <!--          <router-link :to="{ name: 'TeacherCourse' }">Course</router-link> |-->
        <!--          <router-link :to="{ name: 'TeacherMember', params: { mid: 25 } }">-->
        <!--            Data-->
        <!--          </router-link>-->
        <!--        </p>-->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavBar from "../bars/navbar";
import SideBar from "../bars/sidebar";
export default {
  name: "TeacherMain",
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
      padding 40px 5%
.temp-link
  position absolute
  bottom 5px
  left 40%
</style>
