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
import { useStore } from '@/store'
import CitiesListMutationTypes from '@/store/modules/citiesList/types/mutations'
import { onUnmounted } from 'vue'
import Header from '@/components/UI/HeaderUi.vue'
import CitiesList from '@/components/Configuration/CitiesList.vue'
import NewCityForm from '@/components/Configuration//NewCityForm.vue'

const store = useStore()

const disableConfigurable = () => {
  store.commit(CitiesListMutationTypes.SET_CONFIGURABLE, false)
}

onUnmounted(() => {
  disableConfigurable()
})
</script>
