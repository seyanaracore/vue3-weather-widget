import { EWeatherAPIRequestParams } from '@/constants/openWeather'

export interface IWeatherResponse {
  icon: string
  main: string
  description: string
  temp: number
}

export interface IMainResponse {
  temp: number
  humidity: number
  // eslint-disable-next-line camelcase
  feels_like: number
}

interface IWindResponse {
  speed: number
}

interface ISysResponse {
  country: string
}

export interface IOpenWeatherWeatherResponse {
  name: string
  visibility: number
  wind: IWindResponse
  main: IMainResponse
  weather: IWeatherResponse[]
  sys: ISysResponse
  id: number
}

export type IWeatherRequestParams = {
  [key in keyof typeof EWeatherAPIRequestParams]: string
}
export type IWeatherAPIRequestParams = {
  [key in EWeatherAPIRequestParams]: string
}

export type IWeatherRequestParamsByCity = IWeatherRequestParams['cityName']
export type IWeatherRequestParamsByCoords = Pick<IWeatherRequestParams, 'latitude' | 'longitude'>
