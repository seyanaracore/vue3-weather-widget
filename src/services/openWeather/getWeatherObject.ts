import { IWeather } from '@/store/modules/weathers/types/state'
import IOpenWeatherWeatherResponse from './types'

const getCityWeatherObject = (response: IOpenWeatherWeatherResponse): IWeather => {
  const { name, visibility, wind, main, weather, sys, id } = response
  const { description, main: weatherMain, icon: iconUrl } = weather[0]

  const cityWeather: IWeather = {
    id: +id,
    city: name,
    visibility,
    temp: +main.temp.toFixed(1),
    humidity: main.humidity,
    windSpeed: wind.speed,
    feelsLike: +main.feels_like.toFixed(1),
    description,
    main: weatherMain,
    iconUrl,
    country: sys.country,
  }

  return cityWeather
}

export default getCityWeatherObject
