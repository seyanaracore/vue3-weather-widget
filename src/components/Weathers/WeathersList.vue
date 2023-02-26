<template>
  <div v-if="isLoading" class="text-center my-4">
    <Loader />
  </div>

  <WeatherItem
    v-else-if="citiesList.length"
    v-for="city in citiesList"
    :cityName="city.name"
    :key="city.id"
  />
  <NoCities v-else />
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import useFetching from '@/hooks/useFetching'
import useWatchCitiesList from '@/hooks/useWatchCitiesList'
import useLocation from '@/hooks/useLocation'
import Loader from '@/components/UI/LoaderUI.vue'
import NoCities from '@/components/NoCities.vue'
import { IWeatherRequestParamsByCoords } from '@/types/openWeather'
import useWeathersStore from '@/stores/weathers'
import useCitiesListStore from '@/stores/citiesList'
import WeatherItem from './WeatherItem.vue'

const weatherStore = useWeathersStore()
const citiesListStore = useCitiesListStore()

const initWeatherCb = async () => {
  // trying get coords
  const { coords: posCoords } = await useLocation()

  const coords: IWeatherRequestParamsByCoords = {
    latitude: posCoords.latitude.toString(),
    longitude: posCoords.longitude.toString(),
  }

  /*
   Determine the weather by coordinates and save it.
   Get the ID and name of the city from the weather object
   */
  const { id, city } = await weatherStore.getWeather(coords)

  // adding city to cities list
  citiesListStore.addCity({ id, name: city })
}

const { fetching: initWeather, isLoading } = useFetching(initWeatherCb)
const citiesList = computed(() => citiesListStore.citiesList)
const isConfigurable = computed(() => citiesListStore.configurable)
const saveConfiguration = () => citiesListStore.saveConfiguration()
const setConfiguration = () => citiesListStore.setConfiguration()

useWatchCitiesList(citiesList, saveConfiguration)

watch(
  () => isConfigurable.value,
  () => {
    if (isConfigurable.value && !citiesList.value.length) initWeather() // if is configurable and no cities then we can request user location
  }
)

setConfiguration() // set configuration into store
saveConfiguration() // creating an initial entry in local storage (user may reject request location and refresh page)
</script>
