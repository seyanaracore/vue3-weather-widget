import { ref, Ref } from 'vue'

type Callback = () => Promise<void>
type IsLoading = Ref<boolean>
type IsError = Ref<unknown | string>

interface UseFecthing {
  fetching: () => Promise<unknown>
  isLoading: IsLoading
  isError: IsError
}

/**
 * @returns object with fetch func, loading state and error state
 */
const useFetching = (callback: Callback): UseFecthing => {
  const isLoading: IsLoading = ref(false)
  const isError: IsError = ref('')

  const fetching = async () => {
    try {
      isError.value = null
      isLoading.value = true
      await callback()
    } catch (e) {
      if (e instanceof Error) isError.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  return { fetching, isLoading, isError }
}

export default useFetching
