<template><div>Profile</div></template>

<script>
export default {
  name: "MemberProfile",
  data() {
    return {
      info: {}
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    get_info() {
      this.$axios.get("/api/member/info").then(res => {
        res.data;
      });
    }
  }
};
</script>

<style scoped></style>
