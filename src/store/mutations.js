import types from './mutation-types';

export default {
  [types.GET_CURRENT_WEATHER](state, currentWeather) {
    state.currentWeather = currentWeather.data[0];
    state.location = currentWeather.location;
  },
  [types.GET_FORECAST](state, forecast) {
    const forecastArray = forecast.data.slice(1, 7);
    state.forecast = forecastArray;
  },
};
