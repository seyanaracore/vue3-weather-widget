import ky from 'ky'
import { API_URL, BASE_CONFIG_REQUEST } from '@/constants/openWeather'
import {
  type IOpenWeatherWeatherResponse,
  type IWeatherRequestPossibleParams,
} from '@/types/openWeather'
import getRequestParams from '@/service/openWeather/getRequestParams'
import WeatherItem from '@/models/weather'

type GetWeather = (params: IWeatherRequestPossibleParams) => Promise<WeatherItem>

const getWeather: GetWeather = async params => {
  const reqParams = getRequestParams(params)
  const options = { searchParams: { ...BASE_CONFIG_REQUEST, ...reqParams } }
  const response = await ky.get(API_URL, options).json<IOpenWeatherWeatherResponse>()

  return new WeatherItem(response)
}

export default getWeather
