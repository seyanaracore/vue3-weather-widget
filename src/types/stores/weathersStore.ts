import { IWeatherItem } from '@/types'

export interface IWeatherState {
  weathers: {
    [key: string]: IWeatherItem
  }
}
