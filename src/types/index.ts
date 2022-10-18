import { WeatherRequestParams } from '@/services/openWeather/types'

export type City = string
export type WeatherQueryByCity = Required<Pick<WeatherRequestParams, 'city'>>
export type WeatherQueryByCoords = Required<Pick<WeatherRequestParams, 'longitude' | 'latitude'>>
