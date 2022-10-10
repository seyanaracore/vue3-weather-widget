import { API_KEY, API_URL, TEMP_UNIT, WEAHTER_LANG } from '@/constants/openWeather'
import api from '@/utils/api'
import { ApiParams, WeatherRequestParams, EWeatherRequestParams } from './types'

const getRequestUrl = (params: ApiParams): string => {
  const options = new URLSearchParams({
    lang: WEAHTER_LANG,
    units: TEMP_UNIT,
    APPID: API_KEY,
  })

  Object.keys(params).forEach((key) => {
    const paramKey = params[key as keyof ApiParams]

    if (!paramKey) return
    options.set(key, paramKey)
  })
  return `${API_URL}?${options.toString()}`
}

const getRequestParams = (params: WeatherRequestParams): ApiParams => {
  const requestParams: ApiParams = {}

  Object.keys(params).forEach((key) => {
    const paramKey = key as keyof WeatherRequestParams
    const reqKey = EWeatherRequestParams[paramKey]

    if (!paramKey || !reqKey) return

    requestParams[reqKey] = params[paramKey]
  })
  return requestParams
}

const getWeather = (params: WeatherRequestParams) => {
  const requestParams = getRequestParams(params)
  const requestUrl = getRequestUrl(requestParams)
  const response = api.get(requestUrl)

  return response
}

export default getWeather
