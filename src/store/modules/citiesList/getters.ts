import { GetterTree } from 'vuex'
import type { RootState } from '@/store'
import { ICitiesListState, CitiesList, Configurable } from './types/state'

// eslint-disable-next-line no-shadow
export enum CitiesListGettersTypes {
  GET_CITIES_LIST = 'GET_CITIES_LIST',
  GET_IS_CONFIGURABLE = 'GET_IS_CONFIGURABLE',
}

export type Getters = {
  [CitiesListGettersTypes.GET_CITIES_LIST](state: ICitiesListState): CitiesList
  [CitiesListGettersTypes.GET_IS_CONFIGURABLE](state: ICitiesListState): Configurable
}

const getters: GetterTree<ICitiesListState, RootState> & Getters = {
  [CitiesListGettersTypes.GET_CITIES_LIST]: (state) => {
    return state.citiesList
  },
  [CitiesListGettersTypes.GET_IS_CONFIGURABLE]: (state) => {
    return state.configurable
  },
}

export default getters
