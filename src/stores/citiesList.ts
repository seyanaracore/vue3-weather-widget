import { defineStore } from 'pinia'
import LocalStorageUtil from '@/utils/localStorageUtil'
import { WEATHER_CONFIGURATION_LC_KEY } from '@/constants'
import OpenWeatherService from '@/service/openWeather/api'
import { type ICityItem } from '@/types'
import { type ICitiesListState, type ICityPriority } from '@/types/stores/citiesStore'
import { type IWeatherRequestParamsByCity } from '@/types/openWeather'

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
    async addCityByName(name: IWeatherRequestParamsByCity) {
      try {
        const { id, city } = await OpenWeatherService.getWeatherByCityName(name)

        this.addCity({
          id,
          name: city,
        })
      } catch (e) {
        throw Error('City not found')
      }
    },
    setConfigurable(payload: boolean) {
      this.configurable = payload
    },
    setCitiesList(citiesList: ICityItem[]) {
      this.citiesList = citiesList
    },
    /**
     * Change city priority
     * @param city
     * @param city.id target city id
     * @param city.idx new index for target city
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
    /** Saving to storage */
    saveConfiguration() {
      LocalStorageUtil.set(this.citiesList, WEATHER_CONFIGURATION_LC_KEY)
    },
    /** Set configuration from storage */
    setConfiguration() {
      const savedCitiesList = LocalStorageUtil.get(WEATHER_CONFIGURATION_LC_KEY)

      if (savedCitiesList === null) this.setConfigurable(true)
      else this.setCitiesList(savedCitiesList as ICityItem[])
    },
  },
})

export default useCitiesListStore
