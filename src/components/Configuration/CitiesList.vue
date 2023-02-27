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
import { computed } from 'vue'
import NoCities from '@/components/NoCities.vue'
import useCitiesListStore from '@/stores/citiesList'
import CityItem from './CityItem.vue'

const citiesListStore = useCitiesListStore()
const citiesList = computed(() => citiesListStore.citiesList)
</script>
