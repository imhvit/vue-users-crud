<script setup>
import { onMounted, ref } from 'vue'
import OptionList from './components/OptionList.vue'
import UsersTable from './components/UsersTable.vue'

const users = ref([])
const error = ref(null)
const loading = ref(false)

const getUsers = async () => {
  loading.value = true
  error.value = null
  try {
    // Simular retraso
    await new Promise((r) => setTimeout(r, 1000))

    const res = await fetch('https://jsonplaceholder.typicode.com/users')

    if (!res.ok) {
      throw new Error('Error al cargar usuarios')
    }

    users.value = (await res.json()).map((u) => ({
      id: u.id,
      name: u.name,
      username: u.username,
      email: u.email,
      phone: u.phone,
    }))
  } catch (err) {
    error.value = err.message
    console.error(err)
  } finally {
    loading.value = false
  }
}

const addNewUser = (user) => {
  // Generar un ID basado en el ID máximo
  const maxId = users.value.length ? Math.max(...users.value.map((u) => u.id)) + 1 : 1
  users.value.push({
    ...user,
    id: maxId,
  })
}

const updateUser = (user) => {
  users.value = users.value.map((u) => (u.id === user.id ? { ...u, ...user } : u))
}

const deleteUser = (userId) => {
  users.value = users.value.filter((u) => u.id !== userId)
}

onMounted(() => getUsers())
</script>

<template>
  <main>
    <h1>Usuarios</h1>
    <OptionList v-if="!loading && !error" @user-created="addNewUser" />
    <UsersTable
      @user-update="updateUser"
      @user-delete="deleteUser"
      :users="users"
      :error="error"
      :loading="loading"
    />
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
  padding: 1.5rem;
}
</style>
