<template>
  <div>This is About Page</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      this.$axios
        .get("api/v3/ticker/24hr")
        .then((response) => console.log(response))
        .catch((error) => {
          this.errors.push(error);
        });
    },
  },
};
</script>

<style >
</style>