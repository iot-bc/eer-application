<template>
  <div>member data</div>
</template>

<script>
export default {
  name: "TeacherMember",
  data() {
    return {
      member_info: {},
      member_data: {}
    };
  },
  created() {},
  mounted() {},
  computed: {
    teacherID: () => sessionStorage.getItem("id")
  },
  methods: {
    get_member_data(mid) {
      this.$axios
        .get(
          `/api/teacher/${encodeURIComponent(
            this.teacherID
          )}/member/${encodeURIComponent(mid)}`
        )
        .then(res => {
          res.data;
        });
    }
  }
};
</script>

<style scoped></style>
