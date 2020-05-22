<template>
  <div class="main-side-widget">
    <el-divider />
    <div class="side-social">
      <a @click="jump_to_git"><v-icon name="github"></v-icon></a>
    </div>
    <div class="side-copyright">@Copyright, 2020</div>
  </div>
</template>

<script>
export default {
  name: "SideWidget",
  data() {
    return {
      git_url: "https://github.com/iot-bc/eer-application"
    };
  },
  methods: {
    jump_to_git() {
      window.open(this.git_url, "_blank");
    }
  }
};
</script>

<style lang="stylus" scoped>
.main-side-widget
  margin-bottom 15px
  /*&>div*/
  /*  height 30px*/
  /*  line-height 40px*/
.side-copyright
  font-size 16px
  line-height 30px
.icon-github
  height 28px
  &:hover
    color ($color + 30%)
    cursor pointer
</style>
