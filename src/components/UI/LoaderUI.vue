<template>
  <div>
    <div class="spinner-border" :class="`text-${type}`" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

interface IProps {
  type: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<IProps>(), {
  type: 'primary',
})
</script>
