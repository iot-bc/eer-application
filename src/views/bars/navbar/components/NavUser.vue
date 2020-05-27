<template>
  <el-row :span="24" class="main-nav-user">
    <el-col :span="9">
      <el-avatar :size="56" fit="contain" :key="avatar_src">
        <img src="../../../../assets/laoge.png" alt="" />
      </el-avatar>
    </el-col>
    <el-col :span="12">
      <el-dropdown @command="handleCommmand">
        <span class="el-dropdown-link">
          <code>{{ userName }}</code>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="profile">Account</el-dropdown-item>
          <el-dropdown-item command="logout" divided>Logout</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import { Notification } from "element-ui";
export default {
  name: "NavUser",
  data() {
    return {
      avatar_src:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    };
  },
  created() {},
  mounted() {},
  computed: {
    userName: () => sessionStorage.getItem("name"),
    userID: () => sessionStorage.getItem("id"),
    userProfile: () => {
      let name = sessionStorage.getItem("type");
      return name.replace(name[0], name[0].toUpperCase()) + "Profile";
    }
  },
  methods: {
    handleCommmand(command) {
      if (command === "logout") this.sign_out();
      if (command === "profile") this.$router.push({ name: this.userProfile });
    },
    sign_out() {
      // this.$axios.post()
      this.$store.dispatch("logout");
      Notification({
        title: "Logout",
        message: "Back to homepage",
        type: "warning",
        duration: 3000
      });
      setTimeout(() => this.$router.push({ name: "Home" }), 1000);
    }
  }
};
</script>

<style lang="stylus" scoped>
.main-nav-user
  margin-top 4px
  padding 0 10px
  border 0
  &>.el-col
    margin-left 8px
.el-avatar
  margin-top 5px
  border 1px white solid
.el-dropdown
  color white
  cursor pointer
span.el-dropdown-link
  font-size 18px
  width auto
  &>*
    display inline
  &:hover
    text-shadow $text-shadow-primary
</style>
