<template>
  <div id="app">
    <el-header id="header" height="30px">
      <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link :to="{ name: 'Test' }">Test</router-link> |
      <router-link :to="{ name: 'Login', params: {} }">Login</router-link>
      |
      <router-link :to="{ name: 'Register', params: { type: 'dd' } }"
        >Register</router-link
      >
      |
      <router-link to="/member">Member</router-link>
      |
      <router-link to="/teacher">Teacher</router-link>
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
#header
  position absolute
  left 35%
  top 0
</style>
