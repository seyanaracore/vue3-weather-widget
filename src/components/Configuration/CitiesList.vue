<template>
  <div v-if="citiesList.length">
    <CityItem
      v-for="(city, idx) in citiesList"
      :key="city.id"
      :city="city"
      :idx="idx"
      class="mb-3"
    />
  </div>
  <NoCities v-else />
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { CitiesListGettersTypes } from '@/store/modules/citiesList/getters'
import { computed } from 'vue'
import CitiesListActionTypes from '@/store/modules/citiesList/types/actions'
import useWatchCitiesList from '@/hooks/useWatchCitiesList'
import NoCities from '@/components/NoCities.vue'
import CityItem from './CityItem.vue'

const store = useStore()
const citiesList = computed(() => store.getters[CitiesListGettersTypes.GET_CITIES_LIST])
const saveConfiguration = () => store.dispatch(CitiesListActionTypes.SAVE_CONFIGURATION)

useWatchCitiesList(citiesList, saveConfiguration) // when cities list has changed - saving
</script>

<style></style>
