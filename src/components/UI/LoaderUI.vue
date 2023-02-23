<template>
  <div class="spinner-border" :class="`text-${props.type}`" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

interface IProps {
  type?: string
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'primary',
})
</script>
