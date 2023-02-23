import { type IWeatherItem } from '@/types'
import type { IOpenWeatherWeatherResponse } from '@/types/openWeather'

const getCityWeatherObject = (response: IOpenWeatherWeatherResponse): IWeatherItem => {
  const { name, visibility, wind, main, weather, sys, id } = response
  const { description, main: weatherMain, icon: iconUrl } = weather[0]

  return {
    id: id.toString(),
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
}

export default getCityWeatherObject
