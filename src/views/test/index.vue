<template>
  <div id="test-div">
    <h1>{{ test_url }}</h1>
    <vue-json-pretty
      :data="test_data"
      :deep="4"
      showLine
      highlightMouseoverNode
    ></vue-json-pretty>
  </div>
</template>

<script>
import VueJsonPretty from "vue-json-pretty";
export default {
  name: "Test",
  components: {
    VueJsonPretty
  },
  data() {
    return {
      test_url: "/api/test",
      test_data: "before"
    };
  },
  mounted() {
    this.test_api();
  },
  methods: {
    test_api() {
      this.$axios.get(this.test_url).then(res => (this.test_data = res.data));
    }
  }
};
</script>

<style lang="stylus" scoped>
#test-div
  font-size smaller !important
  margin-left 20%
  width 60%
  text-align left
</style>
