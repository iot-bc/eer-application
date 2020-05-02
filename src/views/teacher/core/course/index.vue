<template><div>course</div> </template>

<script>
export default {
  name: "TeacherCourse",
  data() {
    return {
      course: {},
      memberList: []
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    get_course() {
      this.$axios.get("/api/teacher/course").then(res => {
        res.data;
      });
    },
    set_course(tcode) {
      this.$axios.post("/api/teacher/course", { tcode }).then(res => {
        res.data;
      });
    }
  }
};
</script>

<style scoped></style>
