<template>
  <v-app>
    <v-main>
      <v-card class="mx-auto" max-width="1200"> </v-card>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
