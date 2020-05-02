<template>
  <div>Courses</div>
</template>

<script>
export default {
  name: "MemberCourses",
  data() {
    return {
      courses: []
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    get_courses() {
      this.$axios.get("/api/member/teacher").then(res => {
        res.data;
      });
    },
    select_cource(tcode) {
      this.$axios.post("/api/member/teacher", { tcode }).then(res => {
        res.data;
      });
    },
    delete_course(tid) {
      this.$axios.delete(`/api/member/teacher?id=${tid}`).then(res => {
        res.data;
      });
    }
  }
};
</script>

<style scoped></style>
