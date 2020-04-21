<template>
  <div id="app">
    <el-header id="header">
      <router-link to="/">Home</router-link> |
      <router-link to="/test">Test</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/main">User</router-link>
    </el-header>
    <router-view />
  </div>
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px

  #header
    position fixed
    left 0
    top 0
</style>
