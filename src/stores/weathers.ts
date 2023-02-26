import { defineStore } from 'pinia'
import { type ICityItem } from '@/types'
import { type IWeatherState } from '@/types/stores/weathersStore'
import { IWeatherRequestPossibleParams } from '@/types/openWeather'
import getWeather from '@/service/openWeather/api'
import WeatherItem from '@/models/weather'

const useWeathersStore = defineStore('weathers', {
  state: (): IWeatherState => ({
    weathers: {},
  }),
  getters: {
    getCityWeather:
      state =>
      (cityName: ICityItem['name']): WeatherItem =>
        state.weathers[cityName],
  },
  actions: {
    addCityWeather(weather: WeatherItem) {
      this.weathers[weather.city] = weather
    },
    async getWeather(params: IWeatherRequestPossibleParams) {
      const weather = await getWeather(params)

      this.addCityWeather(weather)
      return weather
    },
  },
})

export default useWeathersStore
