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
import Weathers from './views/WeathersView.vue'
import Configuration from './views/ConfigView.vue'
const isConfigView = ref(false)

const configViewToggle = () => {
  isConfigView.value = !isConfigView.value
}
</script>

<style>
@import '@/styles/index.scss';
</style>

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
