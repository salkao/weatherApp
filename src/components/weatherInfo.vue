<template>
  <div class="component">
      <div class="row locationInfo">
        <div class="col s12 ">
            <i class="medium material-icons">location_on</i>
          <h5 class="locationText">
            {{location.name}}, {{ location.country }}
          </h5>
          <h6  id="dateTime"> {{ dateToDisplay }}</h6>
        </div>
      </div>
      <div class="row astro">
        <div class="col m12 l6 s12 ">
          <img class="astroImage" src="../assets/sun.png" alt="Sun image">
          <!-- <h6 class="astroInfo">Sunrise: {{ convertTimeTo24(astro.sunrise) }}</h6>
          <h6 class="astroInfo">Sunset: {{ convertTimeTo24(astro.sunset) }}</h6> -->
        </div>
        <div class="col m12 l6 s12">
          <img class="astroImage"
                src="../assets/moon.png"
                alt="Moon image"
                width="64px"
                height="64px">
          <!-- <h6 class="astroInfo">Moonrise: {{ convertTimeTo24(astro.moonrise) }}</h6>
          <h6 v-if="astro.moonset === 'No moonset'" class="astroInfo">Moonset: No moonset </h6>
          <h6 v-else class="astroInfo">Moonset: {{ convertTimeTo24(astro.moonset) }}</h6> -->
        </div>
      </div>

      <div class="row currentInfo">
        <div class="col l4 m6 s6">
          <img id="conditionIcon"
                v-bind:src="currentWeather.condition.icon"
                alt="Weather icon"
                width="120px"
                height="110px">
          <h6 id="conditionText">{{ currentWeather.condition.text }}</h6>
        </div>
        <div class="col l4 m6 s6 temperature">
            <h1>{{ currentWeather.temp_c }}&#8451;</h1>
            <h6 id="feelsLike" >Feels like: {{ currentWeather.feelslike_c }}&#8451;</h6>
        </div>
        <div class="col l4 m12 s12">
            <h6 class="currentTextInfo" >Clouds: {{ currentWeather.cloud }}%</h6>
            <h6 class="currentTextInfo" >Precipitation: {{ currentWeather.precip_mm }} mm</h6>
            <h6 class="currentTextInfo" >Humidity: {{ currentWeather.humidity }}%</h6>
            <h6 class="currentTextInfo" >Pressure: {{ currentWeather.pressure_mb }} mb</h6>
            <h6 class="currentTextInfo" >UV index: {{ currentWeather.uv }}</h6>
        </div>
      </div>
      <div class="row windInfo">
        <div class="col s4">
            <h6 class="windText" >Wind direction: {{ currentWeather.wind_dir }}</h6>
        </div>
        <div class="col s4">
            <h6 class="windText" >Wind degree: {{ currentWeather.wind_degree }}&deg;</h6>
        </div>
        <div class="col s4">
            <h6 class="windText" >Wind speed: {{ currentWeather.wind_kph }} kph</h6>
        </div>
      </div>
      <div class="row nextDaysRow">
        <div class="col s2 nextDays" v-for="(forecast, index) in forecasts"  :key="index">
          <h6 class="nextDaysDate">{{ getDateTime(index) }}</h6>
          <img v-bind:src="forecast.day.condition.icon" alt="Weather icon">
          <h6 class="nextDaysTemp">{{roundTemp(forecast.day.maxtemp_c) }}&deg;
            <span id="slash"> / </span>
            <sup>{{ roundTemp(forecast.day.mintemp_c) }}&#8451;</sup>
          </h6>
          <h6 class="nextDaysConditionText"> {{ forecast.day.condition.text }}</h6>
        </div>
      </div>
      <div class="row">
        <div class="col s12 rBtn">
          <a @click="geolocation()" class="waves-effect waves-light btn-large myBtn">
            <i class="material-icons right">refresh</i>
            refresh
          </a>
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
  beforeMount() {
    this.geolocation();
  },
  methods: {
    getCurrentDateTime() {
      console.log(this.location, "lokacija");
      const date = this.location.localtime.split(/[-\s:]/);
      this.date = new Date(date[0], parseInt(date[1], 10) - 1, date[2], date[3], date[4]);
      this.dateToDisplay = `${this.days[this.date.getDay()]}, ${this.date.getDate()}. ${this.months[this.date.getMonth()]} ${this.date.getFullYear()}. ${this.date.getHours() < 10 ? `0${this.date.getHours()}` : this.date.getHours()}:${this.date.getMinutes() < 10 ? `0${this.date.getMinutes()}` : this.date.getMinutes()}`;
    },
    getWeather(lat, lon) {
      this.$store.dispatch('getCurrentWeather', [lat, lon]);
    },
    getDateTime(index) {
      const dateArray = this.forecasts[index].date.split('-');
      const date = new Date(dateArray[0], parseInt(dateArray[1], 10) - 1, dateArray[2]);
      return `${this.days[date.getDay()]}, ${date.getDate()}. ${this.months[date.getMonth()]}`;
    },
    roundTemp(temp) {
      const tempToReturn = Math.round(temp);
      return tempToReturn;
    },
    convertTimeTo24(time12) {
      const [time, mod] = time12.split(' ');
      // eslint-disable-next-line
      let [hours, minutes] = time.split(':');
      if (hours === '12') {
        hours = '00';
      }
      if (mod === 'PM') {
        hours = parseInt(hours, 10) + 12;
      }
      return `${hours}:${minutes}`;
    },
    geolocation() {
      navigator.geolocation.getCurrentPosition(this.buildUrl, this.geoError);
    },
    geoError() {
      this.getWeather(0, 0);
    },
    buildUrl(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      this.getWeather(lat, lon);
    },
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
    astro() {
      return this.$store.getters.astro;
    },
  },
};
</script>

<style lang="scss" scoped>
  @media only screen and (max-width: 1150px) {
    .astro {
      padding-left: 0px;
      padding-bottom: 10px !important;
      .astroInfo:nth-of-type(even) {
          padding-top: 0px !important;
        }
      .astroInfo {
        font-size: 16px;
      }
      img {
        width: 70px;
        height: 70px;
      }
    }
    #conditionText {
      font-size: 18px !important;
    }
    #feelsLike {
      font-size: 18px !important;
    }
    .locationText {
      font-size: 35px;
    }
    #dateTime {
      font-size: 18px !important;
      padding: 10px 10px !important;
    }
    .currentInfo {
      padding-top: 10px !important;
      padding-bottom: 10px !important;
    }
    .currentTextInfo {
      padding-left: 0 !important;
      font-size: 16px !important;
      text-align: center;
    }
    img {
      width: 100px;
      height: 100px;
    }
    .temperature {
      h1 {
        font-size: 50px;
      }
    }
    .row {
      margin-bottom: 0px !important;
    }
    .windInfo {
      padding-top: 20px !important;
      padding-left: 10px !important;
      padding-bottom: 20px !important;
      .windText {
        font-size: 16px !important;
      }
    }
    .nextDays{
      text-align: center !important;
      padding: 10px !important;
      .nextDaysDate {
        text-align: center !important;
        padding: 0 !important;
        font-size: 16px !important;
      }
      img {
        width: 35px;
        height: 35px;
      }
      .nextDaysConditionText {
        font-size: 16px !important;
      }
    }
  }

  @media only screen and (max-width: 1000px) {
    .astro {
      padding-left: 0px;
      padding-bottom: 20px !important;
      .astroInfo {
        padding-top: 0px;
        font-size: 12px;
      }
      img {
        width: 50px;
        height: 50px;
      }
    }
    #conditionText {
      font-size: 13px !important;
    }
    #feelsLike {
      font-size: 13px !important;
    }
    .locationText {
      font-size: 20px;
    }
    #dateTime {
      font-size: 14px !important;
      padding: 0px 10px 20px 10px !important;
    }
    .currentInfo {
      padding-top: 0px !important;
      padding-bottom: 20px !important;
    }
    .currentTextInfo {
      padding-left: 0 !important;
      font-size: 12px !important;
      text-align: center;
    }
    img {
      width: 90px;
      height: 90px;
    }
    .temperature {
      h1 {
        font-size: 40px;
      }
    }
    .row {
      margin-bottom: 0px !important;
    }
    .windInfo {
      padding-top: 20px !important;
      padding-left: 10px !important;
      padding-bottom: 20px !important;
      .windText {
        font-size: 12px !important;
      }
    }
    .nextDays{
      text-align: center !important;
      padding: 0px !important;
      .nextDaysDate {
        text-align: center !important;
        padding: 0 !important;
        font-size: 10px !important;
      }
      img {
        width: 35px;
        height: 35px;
      }
      .nextDaysConditionText {
        font-size: 11px !important;
      }
    }
  }
  .material-icons{
    float: left;
  }
  .temperature {
    display: flex;
    flex-direction: column;
  }
  #conditionText {
    text-align: center;
    margin-top: 0;
  }
  .windInfo {
    padding-top: 0;
    padding-bottom: 20px;
    padding-left: 60px;
    border-bottom: 1px solid #fff;
  }
  sup{
    font-size: 14px;
  }
  #slash{
    font-size: 26px;
  }
  .nextDaysTemp {
    text-align: center;
    font-size: 18px;
    color: red;
    span {
      color: #fff;
    }
    sup {
      color: blue;
    }
  }
  .locationInfo {
    padding-top: 20px;
    padding-bottom: 0px;
  }
  .currentInfo {
    padding-top: 10px;
    padding-bottom: 30px;
    padding-right: 0px;
    border-bottom: 1px solid #fff;
  }
  .currentTextInfo {
    padding-left: 40px;
  }
  .astro {
    padding-left: 10%;
    padding-right: 10%;
    border-bottom: 1px solid #fff;
    padding-bottom: 20px
  }

  .astroInfo {
    text-align: left;
  }
  .astroImage {
    float: left;
  }
  #dateTime {
    padding-left: 90px;
    font-size: 20px;
  }
  .nextDays {
    border-right: 1px solid #fff;
  }
  .myBtn {
    width: 200px;
    text-align: right;
    background: linear-gradient(to bottom,#3aa7fc, #0845af);
    border-radius: 30px;
  }
  .nextDaysRow {
    padding-top: 20px;
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
    text-align: center;
    padding-left: 25px;
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
  .windText {

  }
</style>
