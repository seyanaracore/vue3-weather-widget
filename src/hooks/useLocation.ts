const useLocation = (): Promise<GeolocationPosition> =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        return resolve(position)
      },
      e => reject(e)
    )
  })

export default useLocation
