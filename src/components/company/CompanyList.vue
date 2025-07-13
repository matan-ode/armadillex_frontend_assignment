<template>
  <table class="company-list">
      <tr v-for="company in companies" :key="company.id">
        <CompanyPreview :company="company" />
      </tr>
  </table>
</template>

<script setup>
import { defineProps } from 'vue'
import CompanyPreview from './CompanyPreview.vue'

defineProps({
  companies: Array
})

</script>
