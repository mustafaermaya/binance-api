<template>
  <v-card class="mx-auto" max-width="1200">
    <!-- <v-toolbar color="elevation-0">
      <v-spacer></v-spacer> -->

    <!-- <v-btn>Refresh</v-btn>
      <v-btn class="ml-3" @click="addSymbol">Add Symbol</v-btn> -->
    <!-- </v-toolbar> -->
    <SymbolList />
    <!-- <v-container fluid>
      <v-card class="mx-auto" max-width="500">
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-container> -->
    <!-- <div class="text-center">
      <v-dialog v-model="loading" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Loading
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div> -->
    <!-- <v-dialog v-model="dialog" scrollable class="sa">
      <v-toolbar dark color="teal">
        <v-toolbar-title>Search Coin...</v-toolbar-title>
        <v-autocomplete
          v-model="select"
          :loading="loading"
          :items="hello"
          :search-input.sync="search"
          cache-items
          clearable
          class="mx-4"
          flat
          hide-no-data
          hide-details
          label="What state are you from?"
          solo-inverted
        ></v-autocomplete>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
     
    </v-dialog> -->
  </v-card>
</template>

<script>
import SymbolList from "../components/SymbolList.vue";
export default {
  components: {
    SymbolList,
  },
  data() {
    return {
      isLoading: false,
      items: [],
      dialog: false,
      loading: false,
      search: null,
      select: null,
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
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  methods: {
    querySelections(v) {
      //   this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        let items = this.items.filter((e) => {
          return (
            (e.symbol || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
          );
        });
        this.hello = items.map((item) => item.symbol);
        console.log("letitems", items);
        // this.loading = false;
      }, 500);

      console.log("this.items", this.items);
    },
    async addSymbol() {
      this.loading = true;

      const response = await this.$axios.get("api/v3/ticker/24hr");
      if (response.status === 200) {
        // this.options = response.data.map((item) => {
        //   return item.symbol;
        // });
        this.items = response.data.map((item) => {
          return {
            symbol: item.symbol,
            lastPrice: item.lastPrice,
          };
        });
        this.loading = false;
        this.dialog = true;
      }
    },
  },
};
</script>
<style>
</style>