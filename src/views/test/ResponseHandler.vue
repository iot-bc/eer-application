<template>
  <div class="response-handler">
    <h1>
      <code style="color: green">{{ method }} </code> {{ test_url }}
    </h1>
    <vue-json-pretty
      class="json-loc"
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
  name: "ResponseHandler",
  props: {
    url: {
      type: String,
      required: true
    },
    method: {
      type: String,
      default: "get",
      validator: val => {
        return ["get", "post", "put", "delete"].indexOf(val);
      }
    },
    params: {
      type: Object,
      default: null,
      required: false
    },
    payload: {
      type: Object,
      default: null,
      required: false
    }
  },
  components: {
    VueJsonPretty
  },
  data() {
    return {
      test_data: "before",
      test_url: ""
    };
  },
  mounted() {
    this.test_api();
  },
  computed: {},
  methods: {
    test_api() {
      let url = (this.test_url = this.combine_url());
      // this.$axios.get(this.test_url).then(res => (this.test_data = res.data));
      if (this.method === "get")
        this.$axios.get(url).then(res => {
          this.test_data = res.data;
        });
      else if (this.method === "post")
        this.$axios.post(url, this.payload).then(res => {
          this.test_data = res.data;
        });
    },
    combine_url() {
      let path = this.url;
      if (this.params) {
        path += "?";
        this.params.forEach(param => {
          path += `${param.key}=${param[param.key]}&`;
        });
        path = path.substr(0, path.length - 1);
      }
      return path;
    }
  }
};
</script>

<style scoped>
.response-handler {
  font-size: 12px;
  margin: 20px;
  text-align: left;
}
.json-loc {
  overflow-y: scroll;
  overflow-x: auto;
  max-height: 450px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
}
.json-loc::-webkit-scrollbar {
  width: 0;
}
</style>
