<template>
  <q-card>
    <q-card-section>
      <h1>Companies</h1>
    </q-card-section>
    <q-card-section>
        <CompanyList v-if="companies" :companies="companies"/>
        <p v-else>Loading...</p>
    </q-card-section>
  </q-card>
</template>

<script setup>

import CompanyList from 'src/components/company/CompanyList.vue';
import { useCompanies } from 'src/composables/useCompanies'

const { companies } = useCompanies()


</script>
