<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {

    this.setMode('green');
  },
  methods: {
    setMode(mode) {
      document.documentElement.style.setProperty('--secondary-color', `var(--${mode}-color)`);
    },
  },
};
</script>

<style>

</style>
