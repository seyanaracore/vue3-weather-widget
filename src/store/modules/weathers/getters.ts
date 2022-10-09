import { GetterTree } from 'vuex'
import { City } from '@/types/index'
import type { RootState } from '@/store/index'
import { IWeatherState, IWeather } from './types/state'

// eslint-disable-next-line no-shadow
export enum WeathersGettersTypes {
  GET_CITY_WEATHER = 'GET_CITY_WEATHER',
}

export type Getters = {
  [WeathersGettersTypes.GET_CITY_WEATHER](state: IWeatherState): (city: City) => IWeather
}

const getters: GetterTree<IWeatherState, RootState> = {
  [WeathersGettersTypes.GET_CITY_WEATHER]: (state) => (city: City) => {
    return state.weathers[city]
  },
}

export default getters
