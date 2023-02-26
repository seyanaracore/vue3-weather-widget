import type { IOpenWeatherWeatherResponse } from '@/types/openWeather'

class WeatherItem {
  id: string

  temp: number

  feelsLike: number

  main: string

  description: string

  windSpeed: number

  visibility: number

  city: string

  humidity: number

  country: string

  iconUrl: string

  constructor(response: IOpenWeatherWeatherResponse) {
    const { name, visibility, wind, main, weather, sys, id } = response
    const { description, main: weatherMain, icon: iconUrl } = weather[0]

    this.id = id.toString()
    this.city = name
    this.visibility = visibility
    this.temp = +main.temp.toFixed(1)
    this.humidity = main.humidity
    this.windSpeed = wind.speed
    this.feelsLike = +main.feels_like.toFixed(1)
    this.description = description
    this.main = weatherMain
    this.iconUrl = iconUrl
    this.country = sys.country
  }
}

export default WeatherItem
