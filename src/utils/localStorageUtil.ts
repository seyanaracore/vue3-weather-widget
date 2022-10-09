class LocalStorageUtil {
  // eslint-disable-next-line consistent-return
  static get(key: string) {
    if (!key) return null

    try {
      const lcItem = localStorage.getItem(key)

      if (!lcItem) return null
      return JSON.parse(lcItem)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }

    return null
  }

  static set(value: unknown, key: string) {
    if (!key) return

    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }

  static delete(key: string) {
    if (!key) return

    localStorage.removeItem(key)
  }
}

export default LocalStorageUtil
