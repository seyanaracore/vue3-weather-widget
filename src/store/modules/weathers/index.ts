import { Store as VuexStore, CommitOptions, DispatchOptions, Module } from 'vuex'
import type { RootState } from '@/store'
import state from './state'
import getters, { Getters } from './getters'
import mutations, { WeathersMutations as Mutations } from './mutations'
import actions, { IWeathersActions as Actions } from './actions'
import { IWeatherState as State } from './types/state'

export type { State }

export type WeathersStore<S = State> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

export const store: Module<State, RootState> = {
  state,
  getters,
  mutations,
  actions,
}
