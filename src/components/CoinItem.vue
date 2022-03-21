<template>
  <div>
    <v-list-item v-if="loading">
      <v-list-item-content>
        <v-list-item-title
          v-text="'Loading...'"
        ></v-list-item-title> </v-list-item-content
    ></v-list-item>
    <v-list-item v-else>
      <v-list-item-content>
        <v-list-item-title v-text="generateCoinText(coin)"></v-list-item-title>
      </v-list-item-content>
      <v-list-item-action class="list-item-action">
        <span>Last Checked: {{ updatedDate }}</span>
        <v-btn icon class="ml-1">
          <v-icon color="grey lighten-1" @click="deleteCoin"
            >mdi-delete-empty</v-icon
          >
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coinData: {},
      updatedDate: new Date(Date.parse(new Date()))
        .toString()
        .replace(" GMT+0300 (GMT+03:00)", ""),
      loading: true,
    };
  },
  props: {
    coin: {
      type: Object,
      default: () => {
        return {};
      },
    },
    coinUpdateDate: {
      type: String,
    },
  },
  async created() {
    const response = await this.$axios.get(
      `api/v3/ticker/24hr?symbol=${this.coin.symbol}`
    );
    if (response.status === 200) {
      this.loading = false;
      const data = response.data;
      this.coinData = data;
    }
  },
  watch: {
    async coinUpdateDate(val) {
      this.loading = true;
      this.updatedDate = val;
      const response = await this.$axios.get(
        `api/v3/ticker/24hr?symbol=${this.coin.symbol}`
      );
      const data = response.data;
      this.coinData = data;
      this.loading = false;
    },
  },
  mounted() {},
  methods: {
    generateCoinText() {
      return `Symbol : ${this.coinData.symbol} - Last Price : ${this.coinData.lastPrice} - Weighted Avarage Price : ${this.coinData.weightedAvgPrice}`;
    },
    deleteCoin() {
      this.$emit("deleteCoin", this.coin);
    },
  },
};
</script>

<style scoped>
.list-item-action {
  align-items: center;
  flex-direction: row;
}
</style>