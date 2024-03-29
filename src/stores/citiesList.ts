import { defineStore } from 'pinia'
import LocalStorageUtil from '@/utils/localStorageUtil'
import { WEATHER_CONFIGURATION_LC_KEY } from '@/constants'
import { type ICityItem } from '@/types'
import { type ICitiesListState, type ICityPriority } from '@/types/stores/citiesStore'
import { type IWeatherRequestParamsByCity } from '@/types/openWeather'
import getWeather from '@/service/openWeather/api'

const useCitiesListStore = defineStore('citiesList', {
  state: (): ICitiesListState => ({
    citiesList: [],
    configurable: false,
    isLoading: false,
    isError: false,
  }),
  actions: {
    deleteCity(cityId: ICityItem['id']) {
      this.citiesList = this.citiesList.filter(city => city.id !== cityId)
    },
    addCity(newCity: ICityItem) {
      const isNewCity = !this.citiesList.find(city => city.id === newCity.id)

      if (isNewCity) this.citiesList.push(newCity)
    },
    async addCityByName(cityName: IWeatherRequestParamsByCity['cityName']) {
      const { id, city } = await getWeather({ cityName })

      this.addCity({
        id,
        name: city,
      })
    },
    setConfigurable(payload: boolean) {
      this.configurable = payload
    },
    setCitiesList(citiesList: ICityItem[]) {
      this.citiesList = citiesList
    },
    /**
     * Change city priority
     * @param {ICityPriority} city payload params
     * @param {ICityPriority['id']} city.id target city id
     * @param {ICityPriority['idx']} city.idx new index for target city
     */
    setCityPriority(city: ICityPriority) {
      // find target index
      const cityCurrentIdx = this.citiesList.findIndex(cityItem => cityItem.id === city.id)

      // if the indexes are equal - return
      if (cityCurrentIdx === city.idx) return

      const cityObject = this.citiesList[cityCurrentIdx]
      // filtering from the transmitted city
      const filtered = this.citiesList.filter(cityItem => cityItem.id !== cityObject.id)

      // setting the target city by the transmitted index
      filtered.splice(city.idx, 0, cityObject)

      this.citiesList = filtered
    },
    /** Saving config to storage */
    saveConfiguration() {
      LocalStorageUtil.set(this.citiesList, WEATHER_CONFIGURATION_LC_KEY)
    },
    /** Set configuration from storage to store */
    setConfiguration() {
      const savedCitiesList = LocalStorageUtil.get(WEATHER_CONFIGURATION_LC_KEY)

      if (savedCitiesList === null) this.setConfigurable(true)
      else this.setCitiesList(savedCitiesList as ICityItem[])
    },
  },
})

export default useCitiesListStore
