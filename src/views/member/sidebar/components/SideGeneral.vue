<template>
  <el-menu class="main-side-general" default-active="2">
    <el-menu-item @click="push_route('MemberProfile')" index="1">
      <i class="el-icon-user-solid"></i>
      <span>Profile</span>
    </el-menu-item>
    <el-menu-item @click="push_route('MemberDevice')" index="2">
      <i class="el-icon-set-up"></i>
      <span slot="title">Device</span>
    </el-menu-item>
    <el-menu-item @click="push_route('MemberCourses')" index="3">
      <i class="el-icon-s-order"></i>
      <span slot="title">Courses</span>
    </el-menu-item>
    <el-menu-item @click="push_route('MemberData')" index="4">
      <i class="el-icon-coin"></i>
      <span slot="title">Data</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "SideGeneral",
  methods: {
    push_route(route) {
      this.$router.push({ name: route });
    }
  }
};
</script>

<style lang="stylus" scoped>
.main-side-general
  margin-top 50px
  text-align left
  &>.el-menu-item
    font-size 20px
    margin 10px
</style>
