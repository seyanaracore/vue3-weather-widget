<template>
  <div
    ref="cityItem"
    class="city-item d-flex justify-content-between"
    @dragstart="startDrag($event, city.id)"
    @drop="onDrop($event, idx)"
  >
    <div class="d-flex align-items-center">
      <button ref="dragButton" class="btn p-2 drag-button">
        <i class="bi bi-list"></i>
      </button>
      <span>{{ city.name }}</span>
    </div>
    <button class="btn p-2" @click="deleteCity">
      <i class="bi bi-trash3"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ICityItem } from '@/types'
import useDnd from '@/hooks/useDnd'
import useCitiesListStore from '@/stores/citiesList'
import { ICityPriority } from '@/types/stores/citiesStore'

type Idx = number

const props = defineProps<{ city: ICityItem; idx: Idx }>()
const cityItem = ref<HTMLElement>()
const dragButton = ref<HTMLElement>()
const citiesListStore = useCitiesListStore()
const deleteCity = () => citiesListStore.deleteCity(props.city.id)
const changePriority = (params: ICityPriority) => citiesListStore.setCityPriority(params)

const startDrag = (e: DragEvent, id: ICityItem['id']) => {
  if (!e.dataTransfer) return
  e.dataTransfer.dropEffect = 'move'
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('id', id)
}

const onDrop = (draggedEl: DragEvent, idx: Idx) => {
  if (!draggedEl.dataTransfer) return

  const id: ICityItem['id'] = draggedEl.dataTransfer.getData('id')

  changePriority({ id, idx })
}

onMounted(() => {
  if (cityItem.value) useDnd(cityItem.value, dragButton.value)
})
</script>

<style lang="scss" scoped>
.city-item {
  background-color: rgb(0 0 0 / 10%);
}

.drag-button {
  cursor: move;
}
</style>
