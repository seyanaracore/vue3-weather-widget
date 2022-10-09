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
import { useStore } from '@/store'
import { CitiesListGettersTypes } from '@/store/modules/citiesList/getters'
import CitiesListActionTypes from '@/store/modules/citiesList/types/actions'
import useFetching from '@/hooks/useFetching'
import useWatchCitiesList from '@/hooks/useWatchCitiesList'
import { WeatherQueryByCoords } from '@/types/index'
import useLocation from '@/hooks/useLocation'
import Loader from '@/components/UI/LoaderUI.vue'
import NoCities from '@/components/NoCities.vue'
import WeatherItem from './WeatherItem.vue'

const store = useStore()

const addCityByLocation = (coords: WeatherQueryByCoords) => {
  store.dispatch(CitiesListActionTypes.ADD_CITY, coords)
}

const addCity = async () => {
  const { coords: posCoords } = await useLocation()

  const coords: WeatherQueryByCoords = {
    latitude: posCoords.latitude.toString(),
    longitude: posCoords.longitude.toString(),
  }

  addCityByLocation(coords)
}

const { fetching: requestLocation, isLoading } = useFetching(addCity)
const citiesList = computed(() => store.getters[CitiesListGettersTypes.GET_CITIES_LIST])
const isConfigurable = computed(() => store.state.citiesList.configurable)
const saveConfiguration = () => store.dispatch(CitiesListActionTypes.SAVE_CONFIGURATION)
const getConfiguration = () => store.dispatch(CitiesListActionTypes.GET_CONFIGURATION)

useWatchCitiesList(citiesList, saveConfiguration)

watch(
  () => isConfigurable.value,
  () => {
    if (isConfigurable.value && !citiesList.value.length) requestLocation() // if is configurable and no cities then we can request user location
  }
)

getConfiguration()
saveConfiguration() // creating an initial entry in local storage (user may reject request location and refresh page)
</script>

<style scoped></style>
