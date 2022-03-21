<template>
  <div class="mt-3">
    <v-card max-width="1200" class="mx-auto" min-height="600">
      <v-toolbar color="blue-grey lighten-5">
        <v-toolbar-title>Coins</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn @click="clearCoins" class="mr-3">
          <v-icon>mdi-delete-empty</v-icon>
          Clear All
        </v-btn>
        <v-btn @click="refreshCoins" class="mr-3">
          <v-icon>mdi-refresh</v-icon>
          Refresh
        </v-btn>

        <v-btn @click="openAddCoinModal">
          <v-icon>mdi-plus</v-icon>
          Add Symbol
        </v-btn>
      </v-toolbar>

      <v-list subheader two-line v-if="coins.length > 0">
        <coin-item
          v-for="coin in coins"
          :key="coin.title"
          :coin="coin"
          @deleteCoin="deleteCoin($event)"
          :coinUpdateDate="refreshedDate"
        ></coin-item>
      </v-list>
      <v-list v-else class="child">
        <v-list-item-content>
          <v-list-item-title v-text="'No data listed'"></v-list-item-title>
        </v-list-item-content>
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
    <v-dialog v-model="dialog" scrollable ref="hello" max-width="1200">
      <v-toolbar dark color="teal">
        <v-toolbar-title>Search Coin...</v-toolbar-title>
        <v-autocomplete
          v-model="select"
          :loading="loading"
          :items="searchItems"
          :search-input.sync="search"
          class="mx-4"
          clearable
          hide-no-data
          hide-details
          label="You can search coins by typing symbol names..."
          solo-inverted
        ></v-autocomplete>
        <v-btn icon @click="addCoinToList">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
    </v-dialog>
  </div>
</template>

<script>
import CoinItem from "../components/CoinItem.vue";
export default {
  components: {
    CoinItem,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      searchItems: [],
      search: null,
      select: null,
      coins: [],
      refreshCoin: false,
      refreshedDate: new Date(Date.parse(new Date()))
        .toString()
        .replace(" GMT+0300 (GMT+03:00)", ""),
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  created() {
    this.refreshCoinsTenMunites();
  },
  mounted() {
    this.getCoins();
  },
  methods: {
    async openAddCoinModal() {
      this.loading = true;
      const response = await this.$axios.get("api/v3/ticker/24hr");
      if (response.status === 200) {
        this.searchItems = response.data.map((item) => {
          return `${item.symbol} - ${item.lastPrice}`;
        });
        this.loading = false;
        this.dialog = true;
      }
    },
    async addCoinToList() {
      if (this.select == null) {
        alert("Please select a coin...");
        return;
      }
      let splitted = this.select.split("-");
      const selectedCoin = splitted[0].trim();
      const response = await this.$axios.get(
        `api/v3/ticker/24hr?symbol=${selectedCoin}`
      );
      const data = response.data;
      let localStorageData = localStorage.getItem("coins");

      if (localStorageData == null) {
        let coins = [];
        coins.push(data);
        localStorage.setItem("coins", JSON.stringify(coins));
        this.dialog = false;
        this.select = null;
        this.getCoins();
        return;
      }
      let parsedLocalStorage = JSON.parse(localStorageData);

      let findCoin = parsedLocalStorage.find(
        (item) => item.symbol === data.symbol
      );

      if (findCoin !== undefined) {
        alert("You can not add another coin to the list with same name");
        return;
      }

      parsedLocalStorage.push(data);
      localStorage.setItem("coins", JSON.stringify(parsedLocalStorage));

      this.dialog = false;
      this.select = null;
      this.getCoins();
    },
    clearCoins() {
      localStorage.removeItem("coins");
      this.getCoins();
    },
    refreshCoinsTenMunites() {
      setInterval(() => {
        this.refreshedDate = new Date(Date.parse(new Date()))
          .toString()
          .replace(" GMT+0300 (GMT+03:00)", "");
      }, 600 * 1000);
    },
    refreshCoins() {
      this.refreshedDate = new Date()
        .toString()
        .replace(" GMT+0300 (GMT+03:00)", "");
    },
    getCoins() {
      const localStorageData = localStorage.getItem("coins");
      if (localStorageData == null) {
        this.coins = [];
      } else {
        this.coins = JSON.parse(localStorageData);
      }
    },

    querySelections(v) {
      setTimeout(() => {
        this.searchItems.filter((e) => {
          return (
            (e.trimRight(" -") || "")
              .toLowerCase()
              .indexOf((v || "").toLowerCase()) > -1
          );
        });
      }, 500);
    },

    deleteCoin(coin) {
      let localStorageData = localStorage.getItem("coins");
      let parsedLocalStorage = JSON.parse(localStorageData);
      parsedLocalStorage.splice(coin, 1);
      localStorage.removeItem("coins");
      localStorage.setItem("coins", JSON.stringify(parsedLocalStorage));
      this.getCoins();
    },
  },
};
</script>

<style scoped>
.child {
  /* Center vertically and horizontally */
  position: absolute;
  top: 50%;
  left: 47%;
}
</style>