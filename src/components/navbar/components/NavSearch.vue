<template>
  <div class="main-nav-search">
    <el-button type="primary" icon="el-icon-search"></el-button>
    <el-input
      v-model="searchData"
      type="text"
      placeholder="eer application"
    ></el-input>
  </div>
</template>

<script>
export default {
  name: "NavSearch",
  data() {
    return {
      searchData: ""
    };
  }
};
</script>

<style lang="stylus">
.main-nav-search
  line-height $nav-height
  background transparent !important
  &>.el-button
    font-size large
    display inline-block
    padding 6px
    margin-right 5px
  &>.el-input
    display inline-block
    width 150px
    background transparent !important
    &>.el-input__inner
      height 35px
      padding 5px 5px 0
      line-height 30px
      color white
      border-radius 0
      border 0
      border-bottom 1px solid white
      text-underline gainsboro
      /*background-color transparent !important*/
      background-color transparent
</style>
