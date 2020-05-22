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
  computed: {},
  methods: {
    get_member_data(mid) {
      this.$axios.get(`/api/teacher/member/${mid}`).then(res => {
        res.data;
      });
    }
  }
};
</script>

<style scoped></style>
