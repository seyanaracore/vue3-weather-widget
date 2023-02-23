import { type ICityItem } from '@/types'

export interface ICitiesListState {
  citiesList: ICityItem[]
  configurable: boolean
  isLoading: boolean
  isError: boolean
}

export interface ICityPriority {
  id: ICityItem['id']
  idx: number
}
