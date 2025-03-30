<script setup>
import { ref } from 'vue'

const message = ref('')

const childMethod = () => {
  message.value = '親からのイベントを受け取りました!'
}

defineExpose({ childMethod })
</script>

<template>
  <h1>About</h1>

  <RouterLink to="/">homeへ</RouterLink><br>
  <p>{{ message }}</p>
</template>
