<template>
  <div v-if="isError" class="mb-3">
    <Header>{{ props.cityName }}</Header>
    <Error type="danger">{{ errorText }}</Error>
    <button @click="fetchWeather" class="btn btn-primary">{{ tryAgainText }}</button>
  </div>

  <div v-else class="weather-item">
    <Header :class="isPlaceholderClass">
      <span v-if="!isLoading"> {{ weather.city }}, {{ weather.country }} </span>
    </Header>
    <div class="weather">
      <img
        v-if="!isLoading"
        class="weather-icon"
        :src="`https://openweathermap.org/img/wn/${weather.iconUrl}@2x.png`"
        alt="weather icon"
      />
      <h1 :class="isPlaceholderClass">
        <span v-if="!isLoading">{{ weather.temp }}°C</span>
      </h1>
    </div>
    <p :class="isPlaceholderClass">
      <span v-if="!isLoading">
        Feels like {{ weather.feelsLike }}°C. {{ weather.main }}. {{ weather.description }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed /* onUnmounted */ } from 'vue'
import { ICityItem } from '@/types'
import useFetching from '@/hooks/useFetching'
import useWeathersStore from '@/stores/weathers'
// import { WEATHER_UPDATE_INTERVAL } from '@/constants'
import Header from '../UI/HeaderUi.vue'
import Error from '../UI/ErrorUi.vue'

const props = defineProps<{ cityName: ICityItem['name'] }>()
const tryAgainText = 'Try again'
const errorText = 'Some went wrong'
const weatherStore = useWeathersStore()
const weather = computed(() => weatherStore.getCityWeather(props.cityName))
const getWeather = () => weatherStore.getWeatherByCityName(props.cityName)
const { fetching: fetchWeather, isLoading, isError } = useFetching(getWeather)
const isPlaceholderClass = computed(() => ({ placeholder: isLoading.value }))

fetchWeather()

// Updating weather
// const weatherUpdateInterval = setInterval(() => fetchWeather(), WEATHER_UPDATE_INTERVAL)
//
// onUnmounted(() => {
//   clearInterval(weatherUpdateInterval)
// })
</script>

<style lang="scss" scoped>
$weather-icon-size: 100px;

.weather-item {
  display: flex;
  flex-direction: column;

  text-align: inherit;
}

.weather {
  display: flex;
  align-items: center;

  height: $weather-icon-size;
}

.weather-icon {
  width: $weather-icon-size;
  height: $weather-icon-size;
}
</style>
