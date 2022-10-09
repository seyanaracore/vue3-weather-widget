import { ComputedRef, watch } from 'vue'
import { CitiesList } from '@/types/citiesList'

/**
 * Watching for cities list, calling the handler for changes
 */

const useWatchCitiesList = (citiesList: ComputedRef<CitiesList>, handler: () => void): void => {
  watch(
    () => citiesList,
    () => {
      handler()
    },
    { deep: true }
  )
}

export default useWatchCitiesList
