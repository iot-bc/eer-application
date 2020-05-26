<template>
  <div class="member-profile">
    <el-col span="9">
      <el-avatar :size="180">
        <img src="./../../../assets/laoge.png" alt="" />
      </el-avatar>
      <p>Avatar</p>
    </el-col>
    <el-col span="15">
      <ul>
        <li>{{ info }}</li>
      </ul>
    </el-col>
  </div>
</template>

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
          this.info = res.data.data;
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.member-profile
  padding-top 50px
</style>
