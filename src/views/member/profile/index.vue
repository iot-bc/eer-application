<template>
  <div class="member-profile">
    <h1>Profile</h1>
    <el-divider />
    <el-col span="9">
      <el-avatar :size="180">
        <img src="./../../../assets/laoge.png" alt="" />
      </el-avatar>
      <p>Avatar</p>
    </el-col>
    <el-col span="15">
      <ul>
        <li>{{ info.id }}</li>
        <li>{{ info.name }}</li>
        <li>{{ info.type }}</li>
        <li>{{ info.org }}</li>
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
  width 100%
  height 100%
  &>h1
    margin 0
    width 100%
    text-align left
    left 0
    font-size 32px
    line-height 32px
    font-weight 400
  &>.el-divider
    margin 16px 0 32px
</style>
