<template>
  <div id="entrance">
    <button @click="configViewToggle" class="btn view-toggler-btn" :disabled="!isConfigurable">
      <i v-if="!isConfigView" class="bi bi-gear big"></i>
      <i v-else class="bi bi-x-lg big"></i>
    </button>
    <Configuration v-if="isConfigView" />
    <Weathers v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import useCitiesListStore from '@/stores/citiesList'
import useWatchCitiesList from '@/hooks/useWatchCitiesList'
import Weathers from './views/WeathersView.vue'
import Configuration from './views/ConfigView.vue'

const citiesListStore = useCitiesListStore()
const isConfigView = ref(false)
const isConfigurable = computed(() => citiesListStore.configurable)
const citiesList = computed(() => citiesListStore.citiesList)
const saveConfiguration = () => citiesListStore.saveConfiguration()

const configViewToggle = () => {
  isConfigView.value = !isConfigView.value
}

/* Set configuration into store. */
citiesListStore.setConfiguration()

/*
 Watching cities list and save configuration.
 Watching here because cities list may changed without enter config page.
 May be change in weathers list on request location.
 */
useWatchCitiesList(citiesList, saveConfiguration)

/* Saving config on unmount because user can just refresh page without adding a city. */
saveConfiguration()
</script>

<style scoped lang="scss">
#entrance {
  position: relative; // for view-button

  max-width: 260px;
  padding: 10px;
}

.view-toggler-btn {
  position: absolute;
  top: 2px;
  right: 8px;

  padding: 0;

  border: none;

  &:disabled {
    pointer-events: all !important;
    cursor: not-allowed;
  }
}
</style>
