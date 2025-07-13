<template>
  <article class="company-preview">
        <td>
          {{ company.legalName }}
          {{ company.country }}
        </td>
  </article>
</template>

<script setup>

defineProps({
  company: Object
})

</script>


<!-- {
  "id": "pAuC6RQ71bBG",
  "active": true,
  "name": "Market Data Insights LLC",
  "legalName": "Market Data Insights LLC",
  "country": "USA",
  "dateAdded": "Sun, 26 Jan 2025 16:54:36 GMT",
  "isDpfFound": false,
  "parentId": "hDQkIp9PldZO",
  "providesAiServices": true
} -->
