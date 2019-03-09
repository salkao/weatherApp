<template>
  <div class="component">
      <div class="row locationInfo">
        <div class="col s12 ">
          <h5>{{location.name}}, {{ location.country }}</h5>
          <h6  id="dateTime"> {{ dateToDisplay }}</h6>
        </div>
      </div>

      <div class="row currentInfo">
        <div class="col s4">
          <h6 id="conditionText">{{ currentWeather.condition.text }}</h6>
          <img id="conditionIcon" v-bind:src="currentWeather.condition.icon" alt="Weather icon" width="126px" height="126px">
        </div>
        <div class="col s4">
            <h1>{{ currentWeather.temp_c }}&#8451;</h1>
            <h6 id="feelsLike" >Feels like: {{ currentWeather.feelslike_c }}&#8451;</h6>
        </div>
        <div class="col s4">
            <h6 class="currentTextInfo" >Clouds: {{ currentWeather.cloud }}%</h6>
            <h6 class="currentTextInfo" >Precipitation: {{ currentWeather.precip_mm }} mm</h6>
            <h6 class="currentTextInfo" >Humidity: {{ currentWeather.humidity }}%</h6>
            <h6 class="currentTextInfo" >Pressure: {{ currentWeather.pressure_mb }} mb</h6>
            <h6 class="currentTextInfo" >UV index: {{ currentWeather.uv }}</h6>
        </div>
      </div>
      <div class="row windInfo">
        <div class="col s4">
            <h6 id="feelsLike" >Wind direction: {{ currentWeather.wind_dir }}</h6>
        </div>
        <div class="col s4">
            <h6 id="feelsLike" >Wind degree: {{ currentWeather.wind_degree }}&deg;</h6>
        </div>
        <div class="col s4">
            <h6 id="feelsLike" >Wind speed: {{ currentWeather.wind_kph }} kph</h6>
        </div>
      </div>
      <div class="row nextDaysRow">
        <div class="col s2 nextDays" v-for="(forecast, index) in forecasts"  :key="index">
          <h6 class="nextDaysDate">{{ getDateTime(index) }}</h6>
          <img v-bind:src="forecast.day.condition.icon" alt="Weather icon">
          <h6 class="nextDaysConditionText"> {{ forecast.day.condition.text }}</h6>
        </div>
      </div>
      <div class="row">
        <div class="col s12 rBtn">
          <a @click="getWeather" class="waves-effect waves-light btn-large"><i class="material-icons right">refresh</i>refresh</a>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'weatherInfo',
  data() {
    return {
      name: '',
      date: null,
      dateToDisplay: '',
      val: true,
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    };
  },
  beforeUpdate() {
    this.getCurrentDateTime();
  },
  methods: {
    getCurrentDateTime() {
      const date = this.location.localtime.split(/[-\s:]/);
      this.date = new Date(date[0], parseInt(date[1] - 1), date[2], date[3], date[4]);
      this.dateToDisplay = `${this.days[this.date.getDay()]}, ${this.date.getDate()}. ${this.months[this.date.getMonth()]} ${this.date.getFullYear()}. ${this.date.getHours()<10?`0`+ this.date.getHours():this.date.getHours()}:${this.date.getMinutes()<10?`0` + this.date.getMinutes():this.date.getMinutes()}`;
    },
    getWeather() {
      this.$store.dispatch('getCurrentWeather');
      getDateTimeFormat();
    },
    getDateTime(index) {
      const dateArray = this.forecasts[index].date.split('-');
      const date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
      const dateToDisplay = `${this.days[date.getDay()]}, ${date.getDate()}. ${this.months[date.getMonth()]}`;
      return dateToDisplay;
    }
  },
  computed: {
    currentWeather() {
      return this.$store.getters.currentWeather;
    },
    location() {
      return this.$store.getters.location;
    },
    forecasts() {
      return this.$store.getters.forecastSixDays;
    },
  },
};
</script>

<style lang="scss" scoped>
  #conditionText {
    text-align: center;
  }
  .windInfo {
    padding-top: 0;
    padding-bottom: 20px;
    border-bottom: 1px solid #fff;
  }
  .locationInfo {
    padding-top: 60px;
    padding-bottom: 20px;
    border-bottom: 1px solid #fff;
  }
  .currentInfo {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 0px;
    border-bottom: 1px solid #fff;
  }
  .currentTextInfo {
    padding-left: 40px;
  }
  #dateTime {
    padding-left: 30px;
    font-size: 20px;
  }
  .nextDays {
    border-right: 1px solid #fff;
  }
  .nextDaysRow {
    :last-child{
      border-right: none;
    }
  }
  .nextDaysDate {
    font-size: 16px;
    text-align: center;
  }
  .nextDaysConditionText{
    text-align: center;
    font-size: 12px;
  }
  #conditionIcon {
    clear: both;
  }
  #feelsLike {
    clear: both;
    padding-left: 35px;
  }
  h1 {
    margin: 20px;
    font-size: 70px;
    float: left;
  }
  .component{
    padding-bottom: 50px;
  }
  h5 {
    padding-left: 20px;
    text-align: left;
    font-size: 40px;
  }
  h6 {
    text-align: left;

  }
  .rBtn{
    position: absolute;
    bottom: 30px;
  }
</style>
