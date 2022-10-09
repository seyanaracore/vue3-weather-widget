<template>
  <Error class="my-5 text-center" type="secondary">{{ noCityMessage }}</Error>
</template>

<script setup lang="ts">
import Error from './UI/ErrorUi.vue'

const noCityMessage = 'The list of cities is empty.'
</script>
