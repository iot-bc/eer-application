<template
  ><div>{{ info }}</div></template
>

<script>
export default {
  name: "MemberProfile",
  data() {
    return {
      info: {}
    };
  },
  created() {
    this.get_info();
  },
  mounted() {},
  computed: {
    memberID() {
      return sessionStorage.getItem("id");
    }
  },
  methods: {
    get_info() {
      this.$axios
        .get(`/api/member/${encodeURIComponent(this.memberID)}/info`)
        .then(res => {
          this.info = res.data;
        });
    }
  }
};
</script>

<style scoped></style>
