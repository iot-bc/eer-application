<template>
  <div class="member-data">
    <div v-if="hasDevice">device</div>
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
      stats: {},
      hasDevice: false
    };
  },
  created() {},
  mounted() {},
  computed: {
    memberID: () => sessionStorage.getItem("id")
  },
  methods: {
    get_data() {
      this.$axios.get(`/api/member/${this.memberID}/data`).then(res => {
        res.data;
      });
    }
  }
};
</script>

<style scoped></style>
