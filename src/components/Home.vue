<template>
  <v-card class="mx-auto" max-width="500">
    <v-toolbar color="elevation-0">
      <v-spacer></v-spacer>

      <v-btn>Refresh</v-btn>
      <v-btn class="ml-3">Add Symbol</v-btn>
    </v-toolbar>

    <v-container fluid>
      <v-card class="mx-auto" max-width="500">
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-container>
    <div class="text-center">
      <v-btn
        :disabled="loading"
        :loading="loading"
        class="white--text"
        color="purple darken-2"
        @click="getSymbols"
      >
        Start loading
      </v-btn>
      <v-dialog v-model="loading" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Please stand by
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      items: [
        {
          text: "Item 1",
        },
        {
          text: "Item 2",
        },
        {
          text: "Item 3",
        },
      ],
      model: 0,
      bars: [
        { class: "" },
        { class: "", dark: true },
        { class: "primary", dark: true },
        { class: "elevation-0" },
      ],
      cards: [
        {
          title: "Pre-fab homes",
          src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
          flex: 12,
        },
        {
          title: "Favorite road trips",
          src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          flex: 6,
        },
        {
          title: "Best airlines",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
          flex: 6,
        },
      ],
    };
  },
  methods: {
    getSymbols() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
  },
};
</script>