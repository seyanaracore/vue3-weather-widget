/* eslint-disable no-param-reassign */
type DragInitiatorEl = HTMLElement | null

/**
 * Drag and drop hook
 * @param {HTMLElement} dragTarget - html element which will move
 * @param {DragInitiatorEl} dragInitiator - html element which will initiate the move
 */
const useDnd = (dragTarget: HTMLElement, dragInitiator: DragInitiatorEl = null) => {
  dragTarget.draggable = false

  const onDragEnd = () => {
    dragTarget.draggable = false
  }

  const initDrag = () => {
    dragTarget.draggable = true

    const mouseDownEnv = new Event('mousedown')
    const touchMoveEnv = new Event('touchMove')

    dragTarget.dispatchEvent(mouseDownEnv)
    dragTarget.dispatchEvent(touchMoveEnv)
  }

  dragTarget.ondragenter = e => e.preventDefault()
  dragTarget.ondragover = e => e.preventDefault()
  dragTarget.ondragend = onDragEnd

  /**
   * if 'dragInitiator' !== null and !== 'dragTarget' then
   * set drags events 'dragTarget' for 'dragInitiator'
   */
  if (dragInitiator && dragInitiator !== dragTarget) {
    const dragInitiatorEl = dragInitiator

    dragInitiatorEl.onmousedown = initDrag
    dragInitiatorEl.onmouseup = onDragEnd
    dragInitiatorEl.ontouchstart = initDrag
    dragInitiatorEl.ontouchend = onDragEnd

    /*
     * draggable by default - false, we can't drag 'dragTarget'
     * if 'dragInitiator' is null just set true for dragging 'dragTarget'
     * otherwise, the movement will be performed by the initiating element
     */
  } else {
    dragTarget.draggable = true
  }
}

export default useDnd
