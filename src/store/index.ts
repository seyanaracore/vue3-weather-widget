import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store as VuexStore } from 'vuex'
import { store as weathers, WeathersStore, State as WeatherState } from '@/store/modules/weathers'
import {
  store as citiesList,
  CitiesListStore,
  State as CitiesListState,
} from '@/store/modules/citiesList'

export type RootState = {
  citiesList: CitiesListState
  weathers: WeatherState
}

type Store = WeathersStore<Pick<RootState, 'weathers'>> &
  CitiesListStore<Pick<RootState, 'citiesList'>>

// eslint-disable-next-line symbol-description
export const key: InjectionKey<VuexStore<RootState>> = Symbol()

export function useStore(): Store {
  return baseUseStore(key)
}

export default createStore({
  modules: {
    citiesList,
    weathers,
  },
})
