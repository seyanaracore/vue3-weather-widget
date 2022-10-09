import { ActionTree, ActionContext } from 'vuex'
import LocalStorageUtil from '@/utils/localStorageUtil'
import WEATHER_CONFIGURATION_LC_KEY from '@/constants/index'
import IOpenWeatherWeatherResponse, { WeatherRequestParams } from '@/service/openWeather/types'
import type { RootState } from '@/store'
import getWeather from '@/service/openWeather/api'
import { ICitiesListState, CitiesList } from './types/state'
import CitiesListActionTypes from './types/actions'
import { CitiesListMutations } from './mutations'
import CitiesListMutationTypes from './types/mutations'

export type CitiesListAugmentedActionContext = {
  commit<K extends keyof CitiesListMutations>(
    key: K,
    payload: Parameters<CitiesListMutations[K]>[1]
  ): ReturnType<CitiesListMutations[K]>
} & Omit<ActionContext<ICitiesListState, RootState>, 'commit'>

export interface ICitiesListActions {
  [CitiesListActionTypes.ADD_CITY](
    { state, commit }: CitiesListAugmentedActionContext,
    payload: WeatherRequestParams
  ): Promise<void>
  [CitiesListActionTypes.GET_CONFIGURATION]({ state }: CitiesListAugmentedActionContext): void
  [CitiesListActionTypes.SAVE_CONFIGURATION]({ commit }: CitiesListAugmentedActionContext): void
}

const actions: ActionTree<ICitiesListState, RootState> & ICitiesListActions = {
  [CitiesListActionTypes.ADD_CITY]({ state, commit }, params) {
    const addCity = async () => {
      if (state.citiesList.find((city) => city.name === params?.city)) return

      const response: IOpenWeatherWeatherResponse = await getWeather(params)
      const { id, name } = response

      commit(CitiesListMutationTypes.ADD_CITY, {
        id,
        name,
      })
    }

    return addCity()
  },
  [CitiesListActionTypes.SAVE_CONFIGURATION]({ state }) {
    LocalStorageUtil.set(state.citiesList, WEATHER_CONFIGURATION_LC_KEY)
  },
  [CitiesListActionTypes.GET_CONFIGURATION]({ commit }) {
    const savedCitiesList: CitiesList = LocalStorageUtil.get(WEATHER_CONFIGURATION_LC_KEY)

    if (savedCitiesList === null) commit(CitiesListMutationTypes.SET_CONFIGURABLE, true)
    else commit(CitiesListMutationTypes.SET_CITIES_LIST, savedCitiesList)
  },
}

export default actions
