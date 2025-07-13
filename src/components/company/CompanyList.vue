<template>
  <pre>{{ companies }}</pre>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  companies: Array
})

</script>
