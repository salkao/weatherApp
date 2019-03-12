import axios from 'axios';
import types from './mutation-types';

export default {
  getCurrentWeather({ commit }, position) {
    console.log(position, 'posARRAY');
    axios.get(`https://api.apixu.com/v1/current.json?key=4942ac0a1f7a4fca91e140556190503&q=${position[0]},${position[1]}`)
      .then((response) => {
        commit(types.GET_CURRENT_WEATHER, response.data);
      });
    axios.get(`https://api.apixu.com/v1/forecast.json?key=4942ac0a1f7a4fca91e140556190503&q=${position[0]},${position[1]}&days=7`)
      .then((response) => {
        commit(types.GET_FORECAST, response.data);
      });
  },
};
