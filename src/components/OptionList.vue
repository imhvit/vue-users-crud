<script setup>
import CreateUser from './CreateUser.vue'

defineEmits(['userCreated'])
</script>

<template>
  <div class="d-flex justify-content-end gap-2">
    <CreateUser @user-created="$emit('userCreated', $event)" />
  </div>
</template>
