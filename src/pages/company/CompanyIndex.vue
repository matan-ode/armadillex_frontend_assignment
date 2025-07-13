<template>
  <q-card>
    <q-card-section>
      <h1>Companies</h1>
    </q-card-section>
    <q-card-section class="company-list">
      <CompanyList v-if="companies" :companies="companies" />
      <div class="loading" v-else><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
          <path fill="none" stroke="#002644" stroke-width="15" stroke-linecap="round" stroke-dasharray="300 385"
            stroke-dashoffset="0"
            d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z">
            <animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1"
              repeatCount="indefinite"></animate>
          </path>
        </svg></div>
    </q-card-section>
  </q-card>
</template>

<script setup>

import CompanyList from 'src/components/company/CompanyList.vue';
import { useCompanies } from 'src/composables/useCompanies'

const { companies } = useCompanies()


</script>

<style lang="scss" scoped>
h1 {
  font-size: 3em;
}

.company-list {
  min-height: 65vh;
  padding: 0;
}

.loading {
  position: absolute;
  margin: 0;

  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);

  width: 20vh;
}
</style>
