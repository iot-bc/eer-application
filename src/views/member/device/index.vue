<template>
  <div class="member-device">
    <h1>Device</h1>
    <el-divider />

    <div class="device-info-box" v-if="hasDevice">
      <el-card>
        <div slot="header">
          <span>Device Info</span>
          <el-button size="mini" type="danger">delete</el-button>
        </div>
        <div v-for="(item, index) in device" :key="item + index">
          {{ item }}: {{ index }}
        </div>
      </el-card>
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
  created() {
    this.get_device();
  },
  mounted() {},
  computed: {
    memberID: () => sessionStorage.getItem("id")
  },
  methods: {
    get_device() {
      this.$axios
        .get(`/api/member/${encodeURIComponent(this.memberID)}/device`)
        .then(res => {
          let message = res.data;
          if (message.code) {
            this.hasDevice = true;
            this.device = message.data;
          } else {
            this.hasDevice = false;
          }
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
          this.get_device();
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

          this.get_device();
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.member-device
  height 100%
  width 100%
  &>h1
    margin 0
    width 100%
    text-align left
    left 0
    font-size 32px
    line-height 32px
    font-weight 400
  &>.el-divider
    margin 16px 0 32px
  &>.device-info-box
    min-height 200px
    //background black
  &>.device-register-box
    width 100%
    height 100%
    &>.el-button
      width (@width * 0.4)
      height @width
      font-size 240px
      line-height @font-size
      margin-top 50px
      margin-bottom 20px
    &>p
      font-size 28px
      text-decoration underline
</style>
