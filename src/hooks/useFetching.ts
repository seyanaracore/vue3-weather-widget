import { ref } from 'vue'

/**
 * @returns object with fetch func, loading state and error state
 */
const useFetching = <T extends Promise<unknown>>(callback: () => T) => {
  const isLoading = ref<boolean>(false)
  const isError = ref<string | null>('')

  // eslint-disable-next-line consistent-return
  const fetching = async () => {
    try {
      isError.value = null
      isLoading.value = true

      return await callback()
    } catch (e) {
      if (e instanceof Error) isError.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  return { fetching, isLoading, isError }
}

export default useFetching
