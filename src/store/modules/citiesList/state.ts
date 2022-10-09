import { type ICitiesListState } from './types/state'

export type State = ICitiesListState

const state: ICitiesListState = {
  citiesList: [],
  configurable: false,
  isLoading: false,
  isError: false,
}

export default state
