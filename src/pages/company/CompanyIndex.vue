<template>
  <q-card>
    <q-card-section>
      <h1>Companies</h1>
    </q-card-section>
    <q-card-section>
      <pre>
        <CompanyList :companies="companies"/>
      </pre>
    </q-card-section>
  </q-card>
</template>

<script setup>

import CompanyList from 'src/components/company/CompanyList.vue';
import { useCompanies } from 'src/composables/useCompanies'

const { companies } = useCompanies()


</script>
