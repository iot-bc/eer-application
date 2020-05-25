<template>
  <div id="test-div">
    <el-row>
      <el-col :span="12">
        <!--        <response-handler-->
        <!--          class="test-res-hd"-->
        <!--          url="/api/test"-->
        <!--          method="get"-->
        <!--        ></response-handler>-->
      </el-col>
      <el-col :span="12">
        <!--        <response-handler-->
        <!--          class="test-res-hd"-->
        <!--          url="/api/register"-->
        <!--          method="post"-->
        <!--          :payload="{ username: 'laoge', password: 123123 }"-->
        <!--        ></response-handler>-->
        <!--        <response-handler-->
        <!--          class="test-res-hd"-->
        <!--          url="/api/login"-->
        <!--          method="post"-->
        <!--          :payload="{ username: 'laogebiss', password: 123123 }"-->
        <!--        ></response-handler>-->
        <response-handler
          class="test-res-hd"
          url="/api/member/dasd/device"
          method="post"
          :payload="{ deviceToken: 'dasdasdasdasda0' }"
        ></response-handler>
        <!--        <response-handler-->
        <!--          class="test-res-hd"-->
        <!--          url="/api/device/all"-->
        <!--          method="get"-->
        <!--        ></response-handler>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ResponseHandler from "./ResponseHandler";
export default {
  name: "Test",
  components: {
    ResponseHandler
  },
  data() {
    return {
      test_url: "/api/register",
      test_data: "before",
      test_method: ""
    };
  },
  mounted() {
    // this.test_api();
  },
  methods: {
    test_api() {
      // this.$axios.get(this.test_url).then(res => (this.test_data = res.data));
      this.$axios
        .post(this.test_url, { test: "test", type: "post" })
        .then(res => {
          this.test_method = res.config.method;
          this.test_data = res.data;
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
#test-div
  width 100%
  height 100%
  padding-top 50px
  &>.test-res-hd
    display flex
    flex-direction column
    width 400px
    height auto
</style>
