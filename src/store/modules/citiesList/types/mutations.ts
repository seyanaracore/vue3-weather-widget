import { CityId } from '@/types/citiesList'

// eslint-disable-next-line no-shadow
enum CitiesListMutationTypes {
  DELETE_CITY = 'DELETE_CITY',
  ADD_CITY = 'ADD_CITY',
  SET_CITY_PRIORITY = 'SET_CITY_PRIORITY',
  SET_CONFIGURABLE = 'SET_CONFIGURABLE',
  SET_CITIES_LIST = 'SET_CITIES_LIST',
}

export interface ICityPriority {
  id: CityId
  idx: number
}

export default CitiesListMutationTypes
