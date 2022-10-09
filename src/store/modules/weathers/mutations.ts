import { MutationTree } from 'vuex'
import { IWeatherState, IWeather } from './types/state'
import WeathersMutationTypes, { ICityIsLoading, ICityIsError } from './types/mutations'

export type WeathersMutations<S = IWeatherState> = {
  [WeathersMutationTypes.ADD_CITY_WEATHER](state: S, payload: IWeather): void
  [WeathersMutationTypes.SET_CITY_IS_ERORR](state: S, payload: ICityIsError): void
  [WeathersMutationTypes.SET_CITY_IS_LOADING](state: S, payload: ICityIsLoading): void
}

const mutations: MutationTree<IWeatherState> & WeathersMutations = {
  [WeathersMutationTypes.ADD_CITY_WEATHER](state, payload) {
    state.weathers = { ...state.weathers, [payload.city]: payload }
  },
  [WeathersMutationTypes.SET_CITY_IS_ERORR](state, payload) {
    state.weathers = {
      ...state.weathers,
      [payload.id]: { ...state.weathers[payload.id], isError: payload.isError },
    }
  },
  [WeathersMutationTypes.SET_CITY_IS_LOADING](state, payload) {
    state.weathers = {
      ...state.weathers,
      [payload.id]: { ...state.weathers[payload.id], isLoading: payload.isLoading },
    }
  },
}

export default mutations
