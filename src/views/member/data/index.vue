<template>
  <div class="member-data">
    <h1>Data</h1>
    <el-divider />
    <div v-if="hasDevice">
      <div class="data-request-box" v-if="!showChart">
        <el-button
          type="text"
          icon="el-icon-download"
          @click="get_data"
        ></el-button>
        <p>Please click the icon above to request data</p>
      </div>

      <el-row :gutter="50">
        <el-col span="7">
          <el-card v-if="showChart" class="three-data-card">
            <p><span>Steps: </span>{{ eer_data.steps }}</p>
            <p><span>Layers: </span>{{ eer_data.layers }}</p>
            <p><span>Calorie: </span>{{ eer_data.calorie }}</p>
          </el-card>
        </el-col>
        <el-col span="17">
          <ve-line
            class="heartRateAndTemperatureChart"
            v-if="showChart"
            height="300px"
            :data="eer_data.heartRateAndTemperatureChartData"
            :settings="heartRateAndTemperatureChartSetting"
          />
        </el-col>
      </el-row>
      <template v-if="showChart">
        <ve-line
          class="pressureChart"
          height="250px"
          :data="eer_data.pressureChartData"
          :settings="pressureChartSetting"
        />
      </template>
    </div>
    <p v-else style="top: 50%">
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
      showChart: false,
      eer_data: {
        steps: "",
        layers: "",
        calorie: "",
        heartRateAndTemperatureChartData: {
          columns: ["index", "heartRate", "temperature"],
          rows: []
        },
        pressureChartData: {
          columns: ["index", "systolicPressure", "diastolicPressure"],
          rows: []
        }
      },
      heartRateAndTemperatureChartSetting: {
        axisSite: { right: ["temperature"] },
        yAxisType: ["normal", "normal"],
        yAxisName: ["t/m", "℃"],
        metrics: ["heartRate", "temperature"],
        dimension: ["index"],
        min: ["dataMin", 34],
        max: ["dataMax", 40]
      },
      pressureChartSetting: {
        metrics: ["systolicPressure", "diastolicPressure"],
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
      this.eer_data.heartRateAndTemperatureChartData.rows = [];
      this.eer_data.pressureChartData.rows = [];
      data["heartRates"].forEach((heartRate, index) => {
        this.eer_data.heartRateAndTemperatureChartData["rows"].push({
          // 换成时间
          index: `${index + 1}`,
          heartRate,
          temperature: data["temperatures"][index]
        });
      });
      data["systolicPressureList"].forEach((systolicPressure, index) => {
        this.eer_data.pressureChartData["rows"].push({
          // 换成时间
          index: `${index + 1}`,
          systolicPressure,
          diastolicPressure: data["diastolicPressureList"][index]
        });
      });
      this.showChart = true;
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
.three-data-card
  margin-top 45px
  & p
    font-size 18px
    margin 12px 40px
    &>span
      font-weight bold
      text-align left
      margin-right 20px
.heartRateAndTemperatureChart
  margin-right 10px
.data-request-box
  width 100%
  height 100%
  &>.el-button
    width (@width * 0.4)
    height @width
    font-size 240px
    line-height @font-size
    margin-top 80px
    margin-bottom 15px
  &>p
    font-size 28px
    text-decoration underline
</style>
