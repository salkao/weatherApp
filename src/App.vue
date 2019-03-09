<template>
  <div id="app">
      <hello-world/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
  },
  computed: {
    currentWeather() {
      return this.$store.getters.currentWeather;
    },
  },
  beforeMount() {
    this.$store.dispatch('getCurrentWeather');
  },
  methods: {

  },
};
</script>

<style lang="scss">

body {
  padding: 50px 50px 150px 50px;
  margin: 0;
  background-image: url('./assets/sky1.jpg');

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: fixed;
  background-repeat: repeat-y;
  background-size: auto;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
