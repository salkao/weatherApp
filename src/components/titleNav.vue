<template>
  <div class="component">
      <h1>WeatherCaster</h1>
      <h3>Simple weather app</h3>
  </div>
</template>

<script>
export default {
  name: 'titleNav',
};
</script>

<style lang="scss" scoped>
  @media only screen and (max-width: 600px) {
    h1 {
      font-size: 40px !important;
    }
    h3 {
      font-size: 15px !important;
    }
  }
h1{
  font-size: 50px;
  color: #ffffff;
  margin: auto;
  padding: 5px 0 5px 0;
  text-align: left;
}
h3{
  color: #ffffff;
  margin: auto;
  text-align: left;
  padding-bottom: 10px;
  font-size: 20px;
}
</style>
