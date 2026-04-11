<script setup>
import { useModal } from '@/composables/useModal'

const props = defineProps({
  user: { type: Object, required: true },
})

const emit = defineEmits(['userDelete'])

const { modalRef, show, hide, onHidden } = useModal({ backdrop: 'static', keyboard: false })

// Emitir evento con los datos del formulario
const deleteUser = () => {
  onHidden(() => {
    emit('userDelete', props.user.id)
  })
  hide()
}
</script>

<template>
  <div>
    <button type="button" class="btn btn-danger" @click="show">Eliminar</button>

    <div ref="modalRef" class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">Confirmar eliminación</h5>
            <button type="button" class="btn-close btn-close-white" @click="hide"></button>
          </div>
          <div class="modal-body">
            <p>
              ¿Estás seguro de que deseas eliminar a <strong>{{ user.name }}</strong
              >?
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="hide">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="deleteUser">
              Eliminar Usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
