import { defineStore } from 'pinia'
import OpenWeatherService from '@/service/openWeather/api'
import { type ICityItem, type IWeatherItem } from '@/types'
import { type IWeatherState } from '@/types/stores/weathersStore'
import {
  type IWeatherRequestParamsByCity,
  type IWeatherRequestParamsByCoords,
} from '@/types/openWeather'

const useWeathersStore = defineStore('weathers', {
  state: (): IWeatherState => ({
    weathers: {},
  }),
  getters: {
    getCityWeather:
      state =>
      (cityName: ICityItem['name']): IWeatherItem =>
        state.weathers[cityName],
  },
  actions: {
    addCityWeather(weather: IWeatherItem) {
      this.weathers[weather.city] = weather
    },
    async getWeatherByCoords(coords: IWeatherRequestParamsByCoords) {
      const weather = await OpenWeatherService.getWeatherByCoords(coords)

      this.addCityWeather(weather)
      return weather
    },
    async getWeatherByCityName(cityName: IWeatherRequestParamsByCity) {
      const weather = await OpenWeatherService.getWeatherByCityName(cityName)

      this.addCityWeather(weather)
      return weather
    },
  },
})

export default useWeathersStore
