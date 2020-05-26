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
  computed: {
    teacherID: () => sessionStorage.getItem("id")
  },
  methods: {
    get_info() {
      this.$axios.get(`/api/teacher/${this.teacherID}/info`).then(res => {
        res.data;
      });
    }
  }
};
</script>

<style scoped></style>
