<script setup>
import { useModal } from '@/composables/useModal'
import { useUserForm } from '@/composables/useUserForm'

const emit = defineEmits(['userCreated'])

const { name, username, email, phone, errors, handleSubmit, resetForm } = useUserForm()
const { modalRef, show, hide } = useModal({ backdrop: 'static', keyboard: false })

// Cerramos el modal y limpiamos el formulario
const closeModal = () => {
  hide()
  resetForm()
}

// Emitir evento con los datos del formulario
const saveUser = handleSubmit((values) => {
  emit('userCreated', values)
  closeModal()
})
</script>

<template>
  <div>
    <button type="button" class="btn btn-success" @click="show">Crear usuario</button>

    <div ref="modalRef" class="modal fade" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Nuevo Usuario</h1>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <form id="createUserForm" @submit.prevent="saveUser">
              <div class="mb-3">
                <label for="name" class="form-label">Nombre</label>
                <input
                  id="name"
                  autocomplete="name"
                  v-model="name"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.name }"
                  placeholder="Ej: Yosif Blanco"
                  required
                />
                <span class="invalid-feedback">{{ errors.name }}</span>
              </div>
              <div class="mb-3">
                <label for="username" class="form-label">Nombre de usuario</label>
                <input
                  id="username"
                  autocomplete="username"
                  v-model="username"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.username }"
                  placeholder="Ej: yosif19"
                  required
                />
                <span class="invalid-feedback">{{ errors.username }}</span>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Correo</label>
                <input
                  id="email"
                  autocomplete="email"
                  v-model="email"
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': errors.email }"
                  placeholder="Ej: yosif@ejemplo.com"
                  required
                />
                <span class="invalid-feedback">{{ errors.email }}</span>
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Teléfono</label>
                <input
                  id="phone"
                  autocomplete="tel"
                  v-model="phone"
                  type="tel"
                  class="form-control"
                  :class="{ 'is-invalid': errors.phone }"
                  placeholder="Ej: 123456789"
                  required
                />
                <span class="invalid-feedback">{{ errors.phone }}</span>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
            <button type="submit" form="createUserForm" class="btn btn-success">
              Crear usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
