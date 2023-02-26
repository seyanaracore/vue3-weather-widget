import WeatherItem from '@/models/weather'

export interface IWeatherState {
  weathers: {
    [key: string]: WeatherItem
  }
}
