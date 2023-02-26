<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <form @submit.prevent="submitNewCity" class="mt-5">
    <Header>Add location:</Header>
    <div class="d-flex">
      <input
        type="text"
        class="w-100 me-1 p-1"
        v-model="cityName"
        placeholder="Enter city name..."
        ref="cityInput"
      />
      <button type="submit" class="btn submit-btn p-0">
        <i class="bi bi-arrow-return-left big"></i>
      </button>
    </div>
  </form>
  <div class="text-center mt-4">
    <div v-if="typeof isError === 'string'">
      <Error type="danger">{{ isError }}</Error>
    </div>
    <div v-if="isLoading">
      <Loader />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Loader from '@/components/UI/LoaderUI.vue'
import Error from '@/components/UI/ErrorUi.vue'
import Header from '@/components/UI/HeaderUi.vue'
import useFetching from '@/hooks/useFetching'
import useCitiesListStore from '@/stores/citiesList'

const cityName = ref<string>('')
const cityInput = ref<HTMLInputElement>()
const citiesListStore = useCitiesListStore()

const addCity = async () => {
  await citiesListStore.addCityByName(cityName.value)
}

const { fetching: addNewCity, isLoading, isError } = useFetching(addCity)

const submitNewCity = () => {
  if (!cityName.value) {
    isError.value = 'Please enter a city name'
    return
  }

  addNewCity()
  cityName.value = ''
}

onMounted(() => {
  if (cityInput.value) cityInput.value.focus()
})
</script>
