<template>
  <v-app>
    <div class="main">
      <the-navbar />
      <div class="t-wrapper-page">
        <the-header />
        <the-content />
      </div>
    </div>
  </v-app>
</template>

<script>
import TheNavbar from "../src/components/layout/TheNavbar.vue";
import TheHeader from "../src/components/layout/TheHeader.vue";
import TheContent from "../src/components/layout/TheContent.vue";
export default {
  name: "App",

  components: {
    TheNavbar,
    TheHeader,
    TheContent,
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>
@import url("./style/main.css");
</style>
