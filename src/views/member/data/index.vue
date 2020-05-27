<template>
  <div class="member-data">
    <h1>Data</h1>
    <el-divider />
    <div v-if="hasDevice">
      {{ data }}
      <el-button @click="get_data"></el-button>
    </div>
    <p v-else>
      Haven't registered your device, please click
      <router-link :to="{ name: 'MemberDevice' }">here</router-link> to register
      one!
    </p>
  </div>
</template>

<script>
export default {
  name: "MemberData",
  data() {
    return {
      data: {},
      hasDevice: false,
      deviceID: null
    };
  },
  created() {
    this.has_device();
  },
  mounted() {},
  computed: {
    memberID: () => sessionStorage.getItem("id")
  },
  methods: {
    has_device() {
      this.$axios
        .get(`/api/member/${encodeURIComponent(this.memberID)}/device`)
        .then(res => {
          let message = res.data;
          this.hasDevice = message.code;
          if (message.code) this.deviceID = message.data["deviceID"];
        });
    },
    async get_data() {
      let message = await this.$axios
        .get(
          `/api/member/${encodeURIComponent(
            this.memberID
          )}/data/${encodeURIComponent(
            "lwaND5F7Nfbh4QVvnffo99joGpJYQmqNMnroVT/UqKg="
          )}`
        )
        .then(res => res.data);
      if (message.code) {
        this.hasDevice = true;
        this.data = message.data;
      } else this.hasDevice = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.member-data
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
</style>
