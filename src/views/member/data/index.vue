<template>
  <div class="member-data">
    <h1>Data</h1>
    <el-divider />
    <div v-if="hasDevice">
      <el-button @click="get_data">GetData</el-button>
      <ve-line
        class="heartRateChart"
        height="250px"
        :data="eer_data['heartRateChartData']"
        :settings="heartRateChartSetting"
      />
    </div>
    <p v-else>
      Haven't registered your device, please click
      <router-link :to="{ name: 'MemberDevice' }">here</router-link> to register
      one!
    </p>
  </div>
</template>

<script>
export default {
  name: "MemberData",
  data() {
    return {
      eer_data: {
        steps: "",
        layers: "",
        calorie: "",
        heartRateChartData: {
          columns: ["index", "heartRate"],
          rows: []
        },
        temperatureChartData: {
          columns: [],
          rows: []
        },
        pressureChartData: {
          columns: [],
          rows: []
        }
      },
      heartRateChartSetting: {
        metrics: ["heartRate"],
        dimension: ["index"],
        min: ["dataMin"],
        max: ["dataMax"]
      },
      device: null,
      hasDevice: false
    };
  },
  created() {
    this.has_device();
  },
  mounted() {},
  computed: {
    memberID: () => sessionStorage.getItem("id")
  },
  methods: {
    has_device() {
      this.$axios
        .get(`/api/member/${encodeURIComponent(this.memberID)}/device`)
        .then(res => {
          let message = res.data;
          this.hasDevice = message.code;
          this.device = message.data;
        });
    },
    async get_data() {
      let message = await this.$axios
        .get(`/api/member/${encodeURIComponent(this.memberID)}/data`)
        .then(res => res.data);
      if (message.code) {
        this.handle_data(message.data);
      }
    },
    handle_data(data) {
      this.eer_data.steps = data["steps"];
      this.eer_data.layers = data["layers"];
      this.eer_data.calorie = data["calorie"];
      this.eer_data.heartRateChartData.rows = [];
      this.eer_data.pressureChartData.rows = [];
      this.eer_data.temperatureChartData.rows = [];
      data["heartRates"].forEach((heartRate, index) => {
        this.eer_data.heartRateChartData["rows"].push({
          // 换成时间
          index: `${index + 1}`,
          heartRate
        });
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.member-data
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
.heartRateChart
  margin-right 0 !important
  width 40% !important
</style>
