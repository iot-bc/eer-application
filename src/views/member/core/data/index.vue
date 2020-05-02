<template>
  <div>Data</div>
</template>

<script>
export default {
  name: "MemberData",
  data() {
    return {
      stats: {}
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    get_data() {
      this.$axios.get("/api/member/data").then(res => {
        res.data;
      });
    }
  }
};
</script>

<style scoped></style>
