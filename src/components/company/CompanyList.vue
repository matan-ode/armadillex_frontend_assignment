<template>
  <table class="company-list">
    <tr>
      <td>ID</td>
      <td>Is Active</td>
      <td>Name</td>
      <td>Legal Name</td>
      <td>Country</td>
      <td>Date Added</td>
      <td>Is DPF Found</td>
      <td>Parent ID</td>
      <td>Provides AI Services</td>
    </tr>
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

 <!-- "id": "pAuC6RQ71bBG",
    "active": true,
    "name": "Market Data Insights LLC",
    "legalName": "Market Data Insights LLC",
    "country": "USA",
    "dateAdded": "Sun, 26 Jan 2025 16:54:36 GMT",
    "isDpfFound": false,
    "parentId": "hDQkIp9PldZO",
    "providesAiServices": true -->
