<script setup>
import { ref } from 'vue'

defineProps({ message: String })

const emit = defineEmits(['custom-event'])
const handleClick = () => {
  emit('custom-event', 'Hello Parent!')
}

const text = ref('')
</script>

<template>
  <h1>Home</h1>

  <h4>{{ message }}</h4>

  <button v-on:click="handleClick">Click me</button>

  <input v-model="text" type="text">
  <p>{{ text }}</p>

  <slot></slot>

  <RouterLink to="/about">aboutへ</RouterLink>
</template>
