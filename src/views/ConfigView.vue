<template>
  <div>
    <header class="mb-3">
      <Header>Settings</Header>
    </header>
    <CitiesList />
    <NewCityForm />
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import Header from '@/components/UI/HeaderUi.vue'
import CitiesList from '@/components/Configuration/CitiesList.vue'
import NewCityForm from '@/components/Configuration//NewCityForm.vue'
import useCitiesListStore from '@/stores/citiesList'

const citiesListStore = useCitiesListStore()

const disableConfigurable = () => {
  citiesListStore.setConfigurable(false)
}

onUnmounted(() => {
  disableConfigurable()
})
</script>
