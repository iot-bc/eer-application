<template>
  <el-row :span="24" class="main-nav-user">
    <el-col :span="9">
      <el-avatar
        :size="50"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
    </el-col>
    <el-col :span="12">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Account</el-dropdown-item>
          <el-dropdown-item disabled>Settings</el-dropdown-item>
          <el-dropdown-item divided>Logout</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "NavUser",
  data() {
    return {
      username: "laoge"
    };
  }
};
</script>

<style lang="stylus" scoped>
.main-nav-user
  padding 0 10px
  border 0
  &>.el-col
    margin-left 8px
.el-avatar
  margin-top 10px
.el-dropdown
  color white
  cursor pointer
  &>span:hover
    text-shadow $text-shadow-primary
</style>
