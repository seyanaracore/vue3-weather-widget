import { IWeatherRequestParams, IWeatherAPIRequestParams } from '@/types/openWeather'
import { EWeatherAPIRequestParams } from '@/constants/openWeather'

type TParams = Partial<IWeatherRequestParams>

type TRequestParams = Partial<IWeatherAPIRequestParams>

type TGetRequestParams = (params: TParams) => TRequestParams

const getRequestParams: TGetRequestParams = params => {
  const requestParams: TRequestParams = {}
  const paramsKeys = Object.keys(params) as Array<keyof TParams>

  paramsKeys.forEach(key => {
    const requestKey = EWeatherAPIRequestParams[key]

    requestParams[requestKey] = params[key]
  })

  return requestParams
}

export default getRequestParams
