import ky from 'ky'
import { API_URL, BASE_CONFIG_REQUEST } from '@/constants/openWeather'
import type {
  IOpenWeatherWeatherResponse,
  IWeatherRequestParamsByCoords,
} from '@/types/openWeather'
import type { IWeatherItem } from '@/types'
import getWeatherObject from '@/service/openWeather/getWeatherObject'
import { IWeatherRequestParamsByCity } from '@/types/openWeather'
import getRequestParams from '@/service/openWeather/getRequestParams'

type getWeatherByCity = (cityName: IWeatherRequestParamsByCity) => Promise<IWeatherItem>
type getWeatherByCoords = (coords: IWeatherRequestParamsByCoords) => Promise<IWeatherItem>

class OpenWeatherService {
  getWeatherByCityName: getWeatherByCity = async cityName => {
    const reqParams = getRequestParams({ cityName })
    const options = { searchParams: { ...BASE_CONFIG_REQUEST, ...reqParams } }
    const response = await ky.get(API_URL, options).json<IOpenWeatherWeatherResponse>()

    return getWeatherObject(response)
  }

  getWeatherByCoords: getWeatherByCoords = async coords => {
    const reqParams = getRequestParams(coords)
    const options = { searchParams: { ...BASE_CONFIG_REQUEST, ...reqParams } }
    const response = await ky.get(API_URL, options).json<IOpenWeatherWeatherResponse>()

    return getWeatherObject(response)
  }
}

export default new OpenWeatherService()
