<template>
  <Header :class="`text-${props.type}`"><slot></slot></Header>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import Header from './HeaderUi.vue'

interface IProps {
  type?: string
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'warning',
})
</script>
