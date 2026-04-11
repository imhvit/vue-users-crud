import { Modal } from 'bootstrap'
import { onMounted, onUnmounted, ref } from 'vue'

export function useModal(options = {}) {
  const modalRef = ref(null)
  let modal = null

  onMounted(() => {
    if (modalRef.value) {
      modal = new Modal(modalRef.value, options)
    }
  })

  onUnmounted(() => {
    modal?.dispose()
  })

  const show = () => modal?.show()

  const hide = () => {
    document.activeElement?.blur()
    modal?.hide()
  }

  const onHidden = (callback) => {
    if (modalRef.value) {
      modalRef.value.addEventListener('hidden.bs.modal', callback, { once: true })
    }
  }

  return {
    modalRef,
    show,
    hide,
    onHidden,
  }
}
