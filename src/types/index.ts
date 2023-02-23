export interface ICityItem {
  name: string
  id: string
}
export interface IWeatherItem {
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
  isLoading?: boolean
  isError?: boolean
}
