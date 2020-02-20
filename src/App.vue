<template>
  <div v-bind:class="[currentWeather.pod == 'd' ? day : night]" id="app">
      <hello-world x/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
  },
  data() {
    return {
      day: 'day',
      night: 'night',
    };
  },
  computed: {
    currentWeather() {
      return this.$store.getters.currentWeather;
    },
  },
  beforeMount() {
    this.$store.dispatch('getCurrentWeather');
  },
};
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding: 50px 50px 150px 50px;
  margin: 0;

  /* Full height */
  height: 100%;
  width: 100%;

  /* Center and scale the image nicely */
  background-position: fixed;
  background-repeat: repeat-y;
  background-size: cover;
}
.day {
  background-image: url('./assets/sky1.jpg');

}
.night {
  background-image: url('./assets/clearNight.jpg');
}
// #app {
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin: 0;
//   height: 100%;
// }
</style>
