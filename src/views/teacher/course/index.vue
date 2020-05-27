<template>
  <div class="teacher-course">
    <h1>Course</h1>
    <el-divider />
    <el-col class="teacher-course-part" span="10">
      <el-card class="course-members-area">
        <el-table
          class="course-members-table"
          :data="memberList"
          style="width: 100%"
        >
          <el-table-column
            label="MemberID"
            prop="id"
            align="center"
            min-width="150px"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="Name" prop="name" align="center">
          </el-table-column>
          <el-table-column label="Opreation" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="view_data(scope.row.id)"
                plain
                >View</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col class="member-data-part" span="14">
      <div class="member-data-area"></div>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "TeacherCourse",
  data() {
    return {
      course: {},
      memberList: [],
      loading: true
    };
  },
  created() {
    this.get_course();
  },
  mounted() {},
  computed: {
    teacherID() {
      return sessionStorage.getItem("id");
    }
  },
  methods: {
    get_course() {
      this.$axios
        .get(`/api/teacher/${encodeURIComponent(this.teacherID)}/course`)
        .then(res => {
          let message = res.data;
          if (message.code) {
            message.data.forEach(member => {
              this.memberList.push(member);
            });
          }
        });
    },
    set_course(tcode) {
      this.$axios
        .post(`/api/teacher/${encodeURIComponent(this.teacherID)}/course`, {
          tcode
        })
        .then(res => {
          res.data;
        });
    },
    view_data(mid) {
      this.$axios
        .get(`/api/teacher/${encodeURIComponent(this.teacherID)}/data/${mid}`)
        .then(res => {
          res.data;
        });
    },
    simplify_id(id) {
      return id.substr(0, 10) + " ...";
    }
  }
};
</script>

<style lang="stylus" scoped>
.teacher-course
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
  &>.teacher-course-part
    height 100%
    &>.course-members-area
      height auto
      width 100%
  &>.member-data-part
    height 100%
    &>.member-data-area
      height 100px
</style>
