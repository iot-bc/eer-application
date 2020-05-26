<template>
  <div>{{ info }}</div></template
>

<script>
export default {
  name: "TeacherProfile",
  data() {
    return {
      info: {}
    };
  },
  created() {},
  mounted() {},
  computed: {
    teacherID: () => sessionStorage.getItem("id")
  },
  methods: {
    get_info() {
      this.$axios
        .get(`/api/teacher/${encodeURIComponent(this.teacherID)}/info`)
        .then(res => {
          this.info = res.data;
        });
    }
  }
};
</script>

<style scoped></style>
