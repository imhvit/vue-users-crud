<script setup>
import { onMounted, ref } from 'vue'
import IconLoader from './icons/IconLoader.vue'

// Establecemos las variables reactivas
const users = ref([])
const loading = ref(false)
const error = ref(null)

// Creamos una función para obtener los usuarios
const getUsers = async () => {
  loading.value = true
  error.value = null

  try {
    // Simulamos un retraso
    await new Promise((r) => setTimeout(r, 1000))

    // Obtenemos los usuarios
    const res = await fetch('https://jsonplaceholder.typicode.com/users')

    // Si no hay respuesta, mostramos un error
    if (!res.ok) {
      throw new Error('Error al cargar usuarios')
    }

    // Guardamos los usuarios en la variable
    users.value = await res.json()
  } catch (err) {
    // Si hay un error, lo mostramos
    error.value = err.message
    console.error(err)
  } finally {
    // Detenemos el loader
    loading.value = false
  }
}

// Obtenemos los usuarios al montar el componente
onMounted(() => getUsers())
</script>
<template>
  <table v-if="!loading && !error" class="table table-hover">
    <thead>
      <tr data-id="1">
        <th>#</th>
        <th>Nombre</th>
        <th>Usuario</th>
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
          <button class="btn btn-primary">Editar</button>
          <button class="btn btn-danger">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-if="loading" class="content-loader">
    <IconLoader class="loader" />
    <p class="">Cargando Usuarios...</p>
  </div>
  <div v-if="error" class="alert alert-danger">
    {{ error }}
  </div>
</template>

<style scoped>
.content-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 200px 0px;
}
</style>
