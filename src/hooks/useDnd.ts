type DragInitiatorEl = HTMLElement | null

/**
 * Drag and drop hook
 * @param {HTMLElement} dragTarget - html element which will move
 * @param {DragInitiatorEl} dragInitiator - html element which will initiate the move
 */
const useDnd = (dragTarget: HTMLElement, dragInitiator: DragInitiatorEl = null) => {
  const dragEl = dragTarget

  const isDraggable = {
    isDraggable: false,
    get() {
      return this.isDraggable
    },
    set(val: boolean) {
      this.isDraggable = val
      dragEl.draggable = val
    },
  }

  const onDropEnd = () => {
    isDraggable.set(false)
  }

  const initDown = () => {
    isDraggable.set(true)

    const mouseDownEnv = new Event('mousedown')

    dragEl.dispatchEvent(mouseDownEnv)
  }

  isDraggable.set(!dragInitiator && dragInitiator !== dragTarget) // if dragInitiator is null just set true

  dragEl.ondragenter = e => e.preventDefault()
  dragEl.ondragover = e => e.preventDefault()

  if (dragInitiator && dragInitiator !== dragTarget) {
    const dragInitiatorEl = dragInitiator

    dragInitiatorEl.onmouseup = onDropEnd
    dragInitiatorEl.onmousedown = initDown
  }
}

export default useDnd
