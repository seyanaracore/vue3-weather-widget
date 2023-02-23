import { ComputedRef, watch } from 'vue'
import { ICityItem } from '@/types'

/** Watching for cities list, calling the handler for changes */
const useWatchCitiesList = (citiesList: ComputedRef<ICityItem[]>, handler: () => void): void => {
  watch(
    () => citiesList,
    () => {
      handler()
    },
    { deep: true }
  )
}

export default useWatchCitiesList
