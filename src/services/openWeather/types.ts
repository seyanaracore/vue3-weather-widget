import { CityId } from '@/types/citiesList'

interface IWeahter {
  icon: string
  main: string
  description: string
  temp: number
}
interface IMain {
  temp: number
  humidity: number
  ['feels_like']: number
}
interface IWind {
  speed: number
}
interface ISys {
  country: string
}

interface IOpenWeatherWeatherResponse {
  name: string
  visibility: number
  wind: IWind
  main: IMain
  weather: Array<IWeahter>
  sys: ISys
  id: CityId
}

// eslint-disable-next-line no-shadow
export enum EWeatherRequestParams {
  city = 'q',
  latitude = 'lat',
  longitude = 'lon',
}
export type WeatherRequestParams = {
  [key in keyof typeof EWeatherRequestParams]?: string
}
export type ApiParams = {
  [key in EWeatherRequestParams]?: string
}

export default IOpenWeatherWeatherResponse
