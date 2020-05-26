<template>
  <div class="member-device">
    <div class="device-info-box" v-if="hasDevice">
      device。。。
    </div>
    <div class="device-register-box" v-else>
      <el-button
        type="text"
        icon="el-icon-circle-plus-outline"
        @click="add_device"
      ></el-button>
      <p>Please click the icon above to register your device</p>
    </div>
  </div>
</template>

<script>
import { MessageBox, Message } from "element-ui";
export default {
  name: "MemberDevice",
  data() {
    return {
      hasDevice: false,
      deviceToken: "",
      device: {},
      deviceAddress: ""
    };
  },
  created() {},
  mounted() {},
  computed: {
    memberID: () => sessionStorage.getItem("id")
  },
  methods: {
    get_device() {
      this.$axios
        .get(`/api/member/${encodeURIComponent(this.memberID)}/device`)
        .then(res => {
          res.data;
        });
    },
    add_device() {
      MessageBox.prompt("Input device token: ", "提示", {
        confirmButtonText: "Register",
        cancelButtonText: "Cancel"
      })
        .then(async obj => {
          console.log(obj.value);
          let msg = await this.register_device(obj.value);
          Message({
            type: "success",
            message: msg
          });
        })
        .catch(() => {
          Message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    async register_device(token) {
      this.$axios
        .post(`/api/member/${encodeURIComponent(this.memberID)}/device`, {
          deviceToken: token
        })
        .then(res => {
          res.data;
        });
    },
    delete_device() {
      this.$axios
        .delete(`/api/member/${encodeURIComponent(this.memberID)}/device`)
        .then(res => {
          res.data;
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.member-device
  height 88%
  margin-top 8%
  &>.device-info-box
    min-height 200px
    background black
  &>.device-register-box
    width 100%
    height 100%
    &>.el-button
      width (@width * 0.4)
      height @width
      font-size 240px
      line-height @font-size
      margin-top 50px
      margin-bottom 10px
    &>p
      font-size 28px
      text-decoration underline
</style>
