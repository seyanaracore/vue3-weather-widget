import { MutationTree } from 'vuex'
import { CityId } from '@/types/citiesList'
import CitiesListMutationTypes, { ICityPriority } from './types/mutations'
import { ICitiesListState, CitiesList, ICity } from './types/state'

export type CitiesListMutations<S = ICitiesListState> = {
  [CitiesListMutationTypes.DELETE_CITY](state: S, payload: CityId): void
  [CitiesListMutationTypes.ADD_CITY](state: S, payload: ICity): void
  [CitiesListMutationTypes.SET_CONFIGURABLE](state: S, payload: boolean): void
  [CitiesListMutationTypes.SET_CITIES_LIST](state: S, payload: CitiesList): void
  [CitiesListMutationTypes.SET_CITY_PRIORITY](state: S, payload: ICityPriority): void
}

const mutations: MutationTree<ICitiesListState> & CitiesListMutations = {
  [CitiesListMutationTypes.DELETE_CITY](state, payload) {
    state.citiesList = state.citiesList.filter((city) => city.id !== payload)
  },
  [CitiesListMutationTypes.ADD_CITY](state, payload) {
    if (!state.citiesList.find((city) => city.id === payload.id)) state.citiesList.push(payload)
  },
  [CitiesListMutationTypes.SET_CITY_PRIORITY](state, payload) {
    const targetIdx = state.citiesList.findIndex((city) => city.id === payload.id)

    if (targetIdx === payload.idx) return

    const cityItem = state.citiesList[targetIdx]
    const filtered = state.citiesList.filter((city) => city.id !== payload.id)

    filtered.splice(payload.idx, 0, cityItem)
    state.citiesList = filtered
  },
  [CitiesListMutationTypes.SET_CONFIGURABLE](state, payload) {
    state.configurable = payload
  },
  [CitiesListMutationTypes.SET_CITIES_LIST](state, payload) {
    state.citiesList = payload
  },
}

export default mutations
