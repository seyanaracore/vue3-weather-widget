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
import Loader from '@/components/UI/LoaderUI.vue'
import Error from '@/components/UI/ErrorUi.vue'
import Header from '@/components/UI/HeaderUi.vue'
import useFetching from '@/hooks/useFetching'
import CitiesListActionTypes from '@/store/modules/citiesList/types/actions'
import { WeatherQueryByCity } from '@/types/index'
import { useStore } from '@/store'
import { ref } from 'vue'

const cityName = ref('')
const store = useStore()

const addCity = () => {
  const city: WeatherQueryByCity = { city: cityName.value }

  return store.dispatch(CitiesListActionTypes.ADD_CITY, city)
}

const { fetching: addNewCity, isLoading, isError } = useFetching(addCity)

const submitNewCity = () => {
  addNewCity()
  cityName.value = ''
}
</script>
