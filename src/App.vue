<template>
  <v-app>
    <v-main>
      <!-- route outlet -->
      <!-- component matched by the route will render here -->
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
