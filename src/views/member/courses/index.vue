<template>
  <div class="member-courses">
    <h1>Courses</h1>
    <el-divider />
    <el-table
      class="member-course-table"
      :data="courses"
      style="width: 88%;margin-left: 5%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" size="small" class="table-hidden-form">
            <el-form-item label="课程ID:">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="老师:">
              <span>{{ props.row.teacherName }}</span>
            </el-form-item>
            <el-form-item label="课程描述:">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
            <el-form-item label="选课人数:">
              <span>{{ props.row.memberNum }}</span>
            </el-form-item>
            <el-form-item label="课程状态:">
              <span>{{ props.row.status ? "进行中" : "不可选用" }}</span>
            </el-form-item>
            <el-form-item label="课程是否已选:">
              <span>{{ props.row.chosen ? "是" : "否" }}</span>
            </el-form-item>
            <el-form-item
              ><el-button
                v-if="!props.row.chosen"
                size="big"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
                :disabled="!props.row.status"
                >Join</el-button
              >
              <el-button
                v-else
                size="big"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                :disabled="!props.row.status"
                >Quit</el-button
              ></el-form-item
            >
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="Course" prop="id"> </el-table-column>
      <el-table-column label="Teacher" prop="teacherName"> </el-table-column>
      <el-table-column label="Status" prop="status">
        <template slot-scope="scope">
          <span v-if="scope.row.status" style="color: green"
            >● Progressing</span
          >
          <span v-else style="color: red">● Suspending</span>
        </template>
      </el-table-column>
      <el-table-column label="Opreation">
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.chosen"
            size="mini"
            type="primary"
            @click="select_cource(scope.row.id)"
            :disabled="!scope.row.status"
            >Join</el-button
          >
          <el-button
            v-else
            size="mini"
            type="danger"
            @click="delete_course(scope.row.id)"
            :disabled="!scope.row.status"
            >Quit</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  name: "MemberCourses",
  data() {
    return {
      courses: [
        // {
        //   id: "c001",
        //   teacherName: "laoge",
        //   desc: "laodeyi",
        //   memberNum: 5,
        //   status: true,
        //   chosen: true
        // },
        // {
        //   id: "c002",
        //   teacherName: "lbw",
        //   desc: "伞兵一号",
        //   memberNum: 0,
        //   status: false,
        //   chosen: true
        // },
        // {
        //   id: "c003",
        //   teacherName: "pdd",
        //   desc: "瘦100斤",
        //   memberNum: 1,
        //   status: true,
        //   chosen: false
        // },
        // {
        //   id: "c006",
        //   teacherName: "dsm",
        //   desc: "十年王者",
        //   memberNum: 2,
        //   status: true,
        //   chosen: false
        // }
      ]
    };
  },
  created() {
    this.get_courses();
  },
  mounted() {},
  computed: {
    memberID: () => sessionStorage.getItem("id")
  },
  methods: {
    get_courses() {
      this.$axios
        .get(`/api/member/${encodeURIComponent(this.memberID)}/teacher`)
        .then(res => {
          //
          this.courses = res.data.data;
          // res.data;
        });
    },
    async select_cource(tid) {
      console.log(tid);
      let message = await this.$axios
        .post(
          `/api/member/${encodeURIComponent(
            this.memberID
          )}/teacher/${encodeURIComponent(tid)}`
        )
        .then(res => res.data);
      if (message.code) {
        Message({
          type: "success",
          message: message.msg
        });
        setTimeout(() => {
          // refresh
        }, 500);
      } else
        Message({
          type: "danger",
          message: message.msg
        });
    },
    async delete_course(tid) {
      let message = await this.$axios
        .delete(
          `/api/member/${encodeURIComponent(
            this.memberID
          )}/teacher/${encodeURIComponent(tid)}`
        )
        .then(res => res.data);
      if (message.code) {
        Message({
          type: "success",
          message: message.msg
        });
        setTimeout(() => {
          // refresh
        }, 500);
      } else
        Message({
          type: "danger",
          message: message.msg
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.member-courses
  height 100%
  width 100%
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
  &.member-course-table
    margin-left 10%
.table-hidden-form
  font-size 20px !important
</style>
