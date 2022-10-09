<template>
  <div v-if="isError" class="mb-3">
    <Header>{{ props.cityName }}</Header>
    <Error type="danger">{{ errorText }}</Error>
    <button @click="fetchWeather" class="btn btn-primary">{{ tryAgainText }}</button>
  </div>
  <div v-else class="weather-item">
    <Header :class="{ placeholder: isLoading }">{{ weather?.city }}, {{ weather?.country }}</Header>
    <div class="weather">
      <img
        class="weather-icon"
        :src="`https://openweathermap.org/img/wn/${weather?.iconUrl}@2x.png`"
        alt="weather icon"
      />
      <h1 :class="{ placeholder: isLoading }">{{ weather?.temp }}°C</h1>
    </div>
    <p :class="{ placeholder: isLoading }">
      Feels like {{ weather?.feelsLike }}°C. {{ weather?.main }}. {{ weather?.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import { City } from '@/types'
import { WeathersGettersTypes } from '@/store/modules/weathers/getters'
import WeathersActionTypes from '@/store/modules/weathers/types/actions'
import useFetching from '@/hooks/useFetching'
import Header from '../UI/HeaderUi.vue'
import Error from '../UI/ErrorUi.vue'

const tryAgainText = 'Try again'
const errorText = 'Some went wrong'
const props = defineProps<{ cityName: City }>()
const store = useStore()
const weather = computed(() => store.getters[WeathersGettersTypes.GET_CITY_WEATHER](props.cityName))
const getWeather = () => store.dispatch(WeathersActionTypes.GET_WEATHER, props.cityName)
const { fetching: fetchWeather, isLoading, isError } = useFetching(getWeather)

fetchWeather()
</script>

<style lang="scss" scoped>
.weather-item {
  display: flex;
  flex-direction: column;

  text-align: inherit;
}

.weather {
  display: flex;
  align-items: center;
}

.weather-icon {
  width: 100px;
}
</style>
