<template> <div>profile</div></template>

<script>
export default {
  name: "TeacherProfile",
  data() {
    return {
      teacher_info: {},
      member_data: {}
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    get_info() {
      this.$axios.get("/api/teacher/info").then(res => {
        res.data;
      });
    }
  }
};
</script>

<style scoped></style>
