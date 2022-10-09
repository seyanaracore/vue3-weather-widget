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
import CitiesListMutationTypes, { ICityPriority } from '@/store/modules/citiesList/types/mutations'
import { useStore } from '@/store'
import { onMounted, ref } from 'vue'
import { CityId, ICity } from '@/types/citiesList'
import useDnd from '@/hooks/useDnd'

type Idx = number

const props = defineProps<{ city: ICity; idx: Idx }>()
const cityItem = ref<HTMLElement>()
const dragButton = ref<HTMLElement>()
const store = useStore()
const deleteCity = () => store.commit(CitiesListMutationTypes.DELETE_CITY, props.city.id)

const changePriority = (params: ICityPriority) =>
  store.commit(CitiesListMutationTypes.SET_CITY_PRIORITY, params)

const startDrag = (e: DragEvent, id: CityId) => {
  if (!e.dataTransfer) return
  e.dataTransfer.dropEffect = 'move'
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('id', id.toString())
}

const onDrop = (draggedEl: DragEvent, idx: Idx) => {
  if (!draggedEl.dataTransfer) return

  const id: CityId = +draggedEl.dataTransfer.getData('id')

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
