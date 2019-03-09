import state from "./state";

export default {
  currentWeather: state => state.currentWeather,
  location: state => state.location,
  forecast: state => state.forecast,
  forecastSixDays: state => state.forecastSixDays,
};
