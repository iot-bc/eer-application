<template>
  <div class="member-profile">
    <h1>Profile</h1>
    <el-divider />
    <el-row :gutter="25">
      <el-col span="9">
        <el-avatar :size="180">
          <img src="./../../../assets/laoge.png" alt="" />
        </el-avatar>
        <p>Avatar</p>
      </el-col>
      <!--      <el-col span="3"> dsa</el-col>-->
      <el-col :offset="1" span="12">
        <el-form label-position="top" label-width="80px">
          <el-form-item label="User ID">
            <el-input v-model="info.id" readonly></el-input>
          </el-form-item>
          <el-form-item label="Username">
            <el-input v-model="info.name" readonly></el-input>
          </el-form-item>
          <el-form-item label="User Type">
            <el-radio-group :value="info.type">
              <el-radio-button
                v-for="type in user_types"
                :key="type"
                :label="type"
                :disabled="info.type !== type"
              ></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Orgnization">
            <el-input v-model="info.org" readonly></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "MemberProfile",
  data() {
    return {
      user_types: ["Member", "Teacher"],
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
    margin 16px 0 48px
.el-form
  text-align left
</style>
