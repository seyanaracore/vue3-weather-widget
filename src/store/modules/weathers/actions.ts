import { ActionTree, ActionContext } from 'vuex'
import getWeather from '@/service/openWeather/api'
import IOpenWeatherWeatherResponse from '@/service/openWeather/types'
import getCityWeatherObject from '@/service/openWeather/getWeatherObject'
import type { RootState } from '@/store/index'
import { City } from '@/types/index'
import { IWeatherState } from './types/state'
import { WeathersMutations } from './mutations'
import WeathersMutationTypes from './types/mutations'
import WeathersActionTypes from './types/actions'

export type WeatherAugmentedActionContext = {
  commit<K extends keyof WeathersMutations>(
    key: K,
    payload: Parameters<WeathersMutations[K]>[1]
  ): ReturnType<WeathersMutations[K]>
} & Omit<ActionContext<IWeatherState, RootState>, 'commit'>

export interface IWeathersActions {
  [WeathersActionTypes.GET_WEATHER](
    { state, commit }: WeatherAugmentedActionContext,
    cityName: City
  ): Promise<void>
}

const actions: ActionTree<IWeatherState, RootState> & IWeathersActions = {
  [WeathersActionTypes.GET_WEATHER]({ commit, state }, cityName) {
    const fetchCity = async () => {
      if (state.weathers[cityName] || !cityName) return

      const response: IOpenWeatherWeatherResponse = await getWeather({ city: cityName })
      const cityWeather = getCityWeatherObject(response)

      commit(WeathersMutationTypes.ADD_CITY_WEATHER, cityWeather)
    }

    return fetchCity()
  },
}

export default actions
