import types from './mutation-types';

export default {
  [types.GET_CURRENT_WEATHER](state, currentWeather) {
    state.currentWeather = currentWeather.current;
    state.location = currentWeather.location;
  },
  [types.GET_FORECAST](state, forecast) {
    state.forecast = forecast;

    //weather for next 6 days
    if (state.forecastSixDays.length > 0) {
      state.forecastSixDays.length = 0;
      state.forecastSixDays = [];
    }
    for (let i = 1; i < state.forecast.forecast.forecastday.length; i += 1) {
      state.forecastSixDays.push(state.forecast.forecast.forecastday[i]);
    }
  },
};
