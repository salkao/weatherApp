<template>
  <div class="component">
        <div class="">
          <h5 class="locationText">
          <i class="medium material-icons">location_on</i>
            {{currentWeather.city_name}}, {{ currentWeather.country_code }}
          </h5>
        </div>
          <div class="dateTime">
            <h6>Time zone: {{ currentWeather.timezone }}</h6>
            <h6>Current time: {{ new Date().toLocaleTimeString() }}</h6>
            <h6>Date: {{ new Date().toLocaleDateString() }}</h6>
          <!-- <img class="astroImage" src="../assets/sun.png" alt="Sun image">
          <h6 class="astroInfo">Sunrise: {{ currentWeather.sunrise }}</h6>
          <h6 class="astroInfo">Sunset: {{ currentWeather.sunset }}</h6> -->
          </div>
        <div class="container">
          <div >
            <img id="conditionIcon"
                :src="require(`@/assets/icons/${currentWeather.weather.icon}.png`)"
                alt="Weather icon"
                width="120px"
                height="110px">
          </div>
          <div class="temperature">
            <h1>{{ currentWeather.temp }}&#8451;</h1>
          </div>
        </div>
        <div class="container" id="textInfo">
            <h6 id="conditionText" class="column1">{{ currentWeather.weather.description }}</h6>
            <h6 id="feelsLike" class="column1">Feels like: {{ currentWeather.app_temp }}&#8451;</h6>
        </div>
        <!-- <div class="col l4 m12 s12">
        </div> -->
        <hr>
      <div class="container">
        <div class="column">
          <h6 class="currentTextInfo" >Clouds: {{ currentWeather.clouds }}%</h6>
          <h6 class="currentTextInfo" >Precipitation: {{ currentWeather.precip }} mm/hr</h6>
          <h6 class="currentTextInfo" >Humidity: {{ currentWeather.rh }}%</h6>
          <h6 class="currentTextInfo" >Pressure: {{ currentWeather.pres.toFixed(2) }} mb</h6>
        </div>
        <div class="column">
          <h6 class="currentTextInfo" >UV index: {{ currentWeather.uv }}</h6>
          <h6 class="windText" >Wind direction: {{ currentWeather.wind_cdir }}</h6>
          <h6 class="windText" >Wind degree: {{ currentWeather.wind_dir }}&deg;</h6>
          <h6 class="windText" >Wind speed: {{ currentWeather.wind_spd.toFixed(2) }} m/s</h6>
        </div>

      </div>
        <hr>

      <div id="nextDaysContainer" class="container">
        <div class="nextDays" v-for="(forecast, index) in forecasts"  :key="index">
          <h6 class="nextDaysDate">{{ new Date(forecast.datetime).getDate() }}.{{ new Date(forecast.datetime).getMonth() + 1 }}.</h6>
          <img :src="require(`@/assets/icons/${forecast.weather.icon}.png`)"
                alt="Weather icon"
                class="nextDaysImg">
          <h6 class="nextDaysTemp">{{roundTemp(forecast.high_temp) }}&deg;
            <span id="slash"> / </span>
            <sup>{{ roundTemp(forecast.low_temp) }}&#8451;</sup>
          </h6>
          <h6 class="nextDaysConditionText"> {{ forecast.weather.description }}</h6>
        </div>
      </div>
      <div class="container bottom">
        <div class="">
          <button class="myBtn" @click="geolocation()">Refresh
            <i class="material-icons icon">refresh</i>
          </button>
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
      console.log('lat lon', lat, lon);
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
      return this.$store.getters.forecast;
    },
    // currentIcon() {
    //   return require(`@/assets/icons${this.currentWeather.weather.icon}.png`);
    // },
  },
};
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin: 0;
  }
  #nextDaysContainer {
    margin-top: 30px;
  }
  .nextDays {
    border-left: 1px solid #ffffff;
    text-align: center;
    width: 20%;
    padding: 0 5px;
  }
  .nextDays:nth-of-type(1) {
    border: none;
  }
  #textInfo {
    margin-bottom: 20px;
  }
  .nextDaysImg {
    width: 60px;
    height: 60px;
  }
  hr {
    width: 90%;
    border: 0.5px solid #ffffff;
  }
  .column {
    margin: 10px 40px;
    text-align: left;
  }
  .column1 {
    // margin-left: 30px;
    margin: 0 30px;
  }

  .temperature {
    position: relative;
    bottom: 17px;
  }
  sup{
    font-size: 14px;
  }
  #slash{
    font-size: 26px;
  }
  .locationText {
    font-size: 46px;
  }
  .dateTime {
    margin-left: 85px;
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
  .myBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    text-align: center;
    background: linear-gradient(to bottom,#3aa7fc, #0845af);
    border-radius: 30px;
    height: 35px;
    border: none;
    color: #ffffff;
    &:hover {
      font-weight: bolder;
    }
  }
  .bottom {
    margin: 20px 0;
  }
  .icon {
    position: relative;
    top: 1px;
  }
  .nextDaysConditionText {
    font-size: 12px;
  }
</style>
