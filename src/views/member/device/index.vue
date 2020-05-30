<template>
  <div class="member-device">
    <h1>Device</h1>
    <el-divider />

    <div class="device-info-box" v-if="hasDevice">
      <el-card>
        <div class="device-card-header" slot="header">
          <span>Device Info</span>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="delete_device"
            circle
          />
        </div>
        <div class="device-card-info">
          <p v-for="(item, key, index) in device" :key="key + index">
            {{ key }}: {{ item }}
          </p>
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
      device: null,
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
          let message = res.data;
          if (message.code) {
            Message({
              type: "warning",
              message: message.msg
            });
            setTimeout(() => this.get_device(), 500);
          } else
            Message({
              type: "danger",
              message: message.msg
            });
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
.device-info-box
  width 70%
  margin-left 15%
  margin-top 75px
  min-height 200px
  &>.el-card
    width 100%
    & .device-card-header
      text-align left
      &>span
        font-size 24px
        font-weight lighter
      &>.el-button
        float right
    &>.device-card-info
      text-align right
      font-size 24px
    //background black
.device-register-box
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
