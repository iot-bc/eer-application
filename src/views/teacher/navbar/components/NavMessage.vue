<template>
  <div class="main-nav-message">
    <el-popover ref="pop" placement="bottom" width="250" trigger="click">
      <el-table :data="messages">
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
    <el-badge
      v-if="messages.length > 0"
      type="primary"
      class="i-badge"
      :value="messages.length"
    >
      <i v-popover:pop class="el-icon-bell" @click="showMessage"></i>
    </el-badge>
    <i v-else v-popover:pop class="el-icon-bell" @click="showMessage"></i>
  </div>
</template>

<script>
export default {
  name: "NavMessage",
  data() {
    return {
      initMessages: [
        {
          name: "捞哥1111",
          address: "捞哥biss"
        },
        {
          name: "捞哥222",
          address: "捞哥biss"
        },
        {
          name: "捞哥3333",
          address: "捞哥biss"
        },
        {
          name: "捞哥4",
          address: "捞哥biss"
        }
      ],
      messages: []
    };
  },
  created() {
    this.getMessage();
  },
  mounted() {},
  computed: {
    messages_len: function() {
      return this.messages.length;
    }
  },
  methods: {
    getMessage() {
      this.initMessages.forEach(val => this.messages.push(val));
      // this.messages.push(this);
    },
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
