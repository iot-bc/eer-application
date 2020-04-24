<template>
  <div class="main-nav-message">
    <el-popover ref="pop" placement="bottom" width="250" trigger="click">
      <el-table
        :data="[
          {
            name: '捞哥1',
            address: '捞哥biss'
          },
          {
            name: '捞哥2',
            address: '捞哥biss'
          },
          {
            name: '捞哥3',
            address: '捞哥biss'
          },
          {
            name: '捞哥4',
            address: '捞哥biss'
          }
        ]"
      >
        <el-table-column
          width="100"
          property="name"
          label="姓名"
        ></el-table-column>
        <el-table-column
          width="125"
          property="address"
          label="描述"
        ></el-table-column>
      </el-table>
    </el-popover>
    <el-badge type="primary" class="i-badge" value="12">
      <i v-popover:pop class="el-icon-bell" @click="showMessage"></i>
    </el-badge>
  </div>
</template>

<script>
export default {
  name: "NavMessage",
  created() {
    this.getMessage();
  },
  methods: {
    getMessage() {},
    showMessage() {}
  }
};
</script>

<style>
.main-nav-message {
}
.main-nav-message i {
  font-size: 22px;
}
.main-nav-message i:hover {
  text-shadow: 0 0 4px rgb(138, 58, 182);
  cursor: pointer;
}
sup {
  border-radius: 0 !important;
  height: 16px !important;
  line-height: 14px !important;
  font-size: 12px !important;
  border: 0 !important;
  padding: 0 3px !important;
  font-weight: bold;
  text-shadow: 0 0 4px rgba(238, 9, 44, 0.8);
}
</style>
