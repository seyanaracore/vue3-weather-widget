import { CityId } from '@/types/citiesList'

export type IsError = boolean
export type IsLoading = boolean
export interface IWeather {
  id: CityId
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
  isLoading?: IsLoading
  isError?: IsError
}

interface IWeathersList {
  [key: string]: IWeather
}
export interface IWeatherState {
  weathers: IWeathersList
}
