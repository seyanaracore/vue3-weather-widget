import { CityId } from '@/types/citiesList'
import { IsLoading, IsError } from './state'

// eslint-disable-next-line no-shadow
enum WeathersMutationTypes {
  ADD_CITY_WEATHER = 'ADD_CITY_WEATHER',
  SET_CITY_IS_LOADING = 'SET_CITY_IS_LOADING',
  SET_CITY_IS_ERORR = 'SET_CITY_IS_ERORR',
}

export interface ICityIsLoading {
  id: CityId
  isLoading: IsLoading
}

export interface ICityIsError {
  id: CityId
  isError: IsError
}

export default WeathersMutationTypes
