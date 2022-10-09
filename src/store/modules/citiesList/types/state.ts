import { CitiesList, ICity } from '@/types/citiesList'

export type Configurable = boolean
export type IsLoading = boolean
export type IsError = boolean
export { CitiesList, ICity }

export interface ICitiesListState {
  citiesList: CitiesList
  configurable: Configurable
  isLoading: IsLoading
  isError: IsError
}
