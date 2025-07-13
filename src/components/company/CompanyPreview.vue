<template>
  <td>
    {{ company.id }}
  </td>
  <td>
    {{ company.active }}
  </td>
  <td>
    {{ company.name }}
  </td>
  <td>
    {{ company.legalName }}
  </td>
  <td>
    {{ company.country }}
  </td>
  <td>
    {{ company.dateAdded }}
  </td>
  <td>
    {{ company.isDpfFound }}
  </td>
  <td>
    {{ company.parentId }}
  </td>
  <td>
    {{ company.providesAiServices }}
  </td>


</template>

<script setup>

defineProps({
  company: Object
})

</script>

<style scoped lang="scss"></style>
