<template> <div>Device</div></template>

<script>
export default {
  name: "MemberDevice",
  data() {
    return {
      device: {},
      deviceAddress: ""
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    get_device() {
      this.$axios.get("/api/member/device").then(res => {
        res.data;
      });
    },
    set_device() {
      this.$axios
        .post("/api/member/device", { address: this.deviceAddress })
        .then(res => {
          res.data;
        });
    },
    delete_device() {
      this.$axios.delete("/api/member/device").then(res => {
        res.data;
      });
    }
  }
};
</script>

<style scoped></style>
