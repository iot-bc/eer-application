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
  computed: {
    memberID() {
      return sessionStorage.getItem("id");
    }
  },
  methods: {
    get_info() {
      this.$axios.get(`/api/member/${this.memberID}/info`).then(res => {
        this.info = res.data;
      });
    }
  }
};
</script>

<style scoped></style>
