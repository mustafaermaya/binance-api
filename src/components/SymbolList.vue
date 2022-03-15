<template>
  <div class="mt-3">
    <v-card max-width="1200" class="mx-auto">
      <v-toolbar color="blue-grey lighten-5">
        <v-toolbar-title>Symbols</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn @click="hello" class="mr-3">
          <v-icon>mdi-refresh</v-icon>
          Refresh
        </v-btn>

        <v-btn @click="addSymbol">
          <v-icon>mdi-plus</v-icon>
          Add Symbol
        </v-btn>
      </v-toolbar>

      <v-list subheader two-line v-if="symbols.length > 0">
        <v-list-item v-for="symbol in symbols" :key="symbol.title">
          <v-list-item-content>
            <v-list-item-title
              v-text="generateText(symbol)"
            ></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-delete-empty</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item-action>
          <v-btn disabled>
            <v-icon color="grey lighten-1">mdi-delete-empty</v-icon>
            There is no added symbol
          </v-btn>
        </v-list-item-action>
      </v-list>
    </v-card>
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
    <v-dialog v-model="dialog" scrollable ref="hello">
      <v-toolbar dark color="teal">
        <v-toolbar-title>Search Coin...</v-toolbar-title>
        <v-autocomplete
          v-model="select"
          :loading="loading"
          :items="hello1"
          :search-input.sync="search"
          class="mx-4"
          clearable
          hide-no-data
          hide-details
          label="What you are looking for is here..."
          solo-inverted
        ></v-autocomplete>
        <v-btn icon @click="addSymbolToList">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      dialog: false,
      hello1: [],
      search: null,
      select: null,
      items: [],
      symbols: [],
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  methods: {
    generateText(e) {
      return `Symbol : ${e.symbol} - Last Price : ${e.lastPrice} - Weighted Avarage Price : ${e.weightedAvgPrice}`;
    },
    async addSymbolToList() {
      let splitted = this.select.split("-");
      const selectedCoin = splitted[0].trim();
      //   console.log(splitted.trim());
      const response = await this.$axios.get(
        `api/v3/ticker/24hr?symbol=${selectedCoin}`
      );
      const data = response.data;
      console.log(data);
      this.symbols.push(data);
      this.dialog = false;
      this.select = null;
    },
    querySelections(v) {
      //   this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        let items = this.items.filter((e) => {
          return (
            (e.symbol || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
          );
        });
        this.hello1 = items.map((item) => {
          return `${item.symbol} - ${item.lastPrice}`;
        });
        console.log("letitems", this.hello1);
        // this.loading = false;
      }, 500);

      //   console.log("this.items", this.items);
    },
    hello() {
      console.log("sdsdsd");
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
        console.log(this.items);
        this.hello1 = this.items.map((item) => {
          return `${item.symbol} - ${item.lastPrice}`;
        });
        this.loading = false;
        this.dialog = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>