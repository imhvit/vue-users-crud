<script setup>
import DeleteUser from './DeleteUser.vue'
import EditUser from './EditUser.vue'
import IconLoader from './icons/IconLoader.vue'

defineProps({
  users: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: null,
  },
})

defineEmits(['userUpdate', 'userDelete'])
</script>
<template>
  <div class="table-container">
    <table v-if="!loading && !error" class="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Nombre de usuario</th>
          <th>Correo electrónico</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>{{ u.id }}</td>
          <td>{{ u.name }}</td>
          <td>{{ u.username }}</td>
          <td>{{ u.email }}</td>
          <td>{{ u.phone.split(' x')[0] }}</td>
          <td class="d-flex gap-2">
            <EditUser @user-update="$emit('userUpdate', $event)" :user="u" />
            <DeleteUser @user-delete="$emit('userDelete', $event)" :user="u" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="loading" class="content-loader">
    <IconLoader class="loader" />
    <p class="">Cargando usuarios</p>
  </div>
  <div v-if="error" class="alert alert-danger">
    {{ error }}
  </div>
</template>

<style scoped>
.table-container {
  overflow-x: auto;
}
.content-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 200px 0px;
}
</style>
