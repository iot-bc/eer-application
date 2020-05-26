<template>
  <div class="member-data">
    <div v-if="hasDevice">{{ info }}</div>
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
      info: {},
      hasDevice: false
    };
  },
  created() {},
  mounted() {},
  computed: {
    memberID: () => sessionStorage.getItem("id")
  },
  methods: {
    async get_data() {
      let message = await this.$axios
        .get(`/api/member/${encodeURIComponent(this.memberID)}/data`)
        .then(res => res.data);
      if (message.code) {
        this.hasDevice = true;
        this.info = message.data;
      } else this.hasDevice = false;
    }
  }
};
</script>

<style scoped></style>
