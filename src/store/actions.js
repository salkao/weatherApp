import axios from 'axios';
import types from './mutation-types';

export default {
  getCurrentWeather({ commit }, position) {
    console.log(position, 'posARRAY');
      axios.get(`https://api.weatherbit.io/v2.0/current?lat=${position[0]}&lon=${position[1]}&key=c6273307c915435eb1883e324df0f2ec`)
        .then((response) => {
          console.log(response, 'current');
          commit(types.GET_CURRENT_WEATHER, response.data);
        });
        axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${position[0]}&lon=${position[1]}&key=c6273307c915435eb1883e324df0f2ec`)
        .then((response) => {
          console.log(response.data, 'forecast');
          commit(types.GET_FORECAST, response.data);
        });
  },
};
