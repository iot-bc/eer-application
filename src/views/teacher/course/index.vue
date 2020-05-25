<template>
  <div class="teacher-course">
    <el-col class="teacher-course-part" span="12">
      <div class="course-info-area"></div>
      <div class="course-members-area">
        <el-table
          class="course-members-table"
          :data="memberList"
          style="width: 100%"
        >
          <el-table-column label="MemberID" prop="id"> </el-table-column>
          <el-table-column label="Name" prop="name"> </el-table-column>
          <el-table-column label="Opreation">
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
      </div>
    </el-col>
    <el-col class="member-data-part" span="12">
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
    this.init_stub();
  },
  mounted() {},
  computed: {
    teacherID() {
      return sessionStorage.getItem("id");
    }
  },
  methods: {
    init_stub() {
      this.memberList.push({
        id: 1,
        name: 22
      });
    },
    get_course() {
      this.$axios.get(`/api/teacher/${this.teacherID}/course`).then(res => {
        res.data;
      });
    },
    set_course(tcode) {
      this.$axios
        .post(`/api/teacher/${this.teacherID}/course`, { tcode })
        .then(res => {
          res.data;
        });
    },
    get_list() {
      return "";
    },
    view_data(mid) {
      this.$axios
        .get(`/api/teacher/${this.teacherID}/data/${mid}`)
        .then(res => {
          res.data;
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.teacher-course
  &>.teacher-course-part
    height 100%
    &>.course-info-area
      width 100%
      height 250px
      border 2px solid black
    &>.course-members-area
      height auto
      width 90%
      padding 1% 5%
      border 2px solid black
  &>.member-data-part
    height 100%
    &>.member-data-area
      height 100px
</style>
