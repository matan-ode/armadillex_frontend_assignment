<template>
  <q-card>
    <q-card-section class="q-pb-none flex space-between">
      <h1>Companies</h1>
      <q-btn padding="none" color="none" flat @click="toggleTableDisplay">
        <q-avatar v-if="isGridDisplay">
          <img src="../../assets/icons/table-icon.svg">
        </q-avatar>
        <q-avatar v-else>
          <img src="../../assets/icons/grid-icon.svg">
        </q-avatar>
      </q-btn>

    </q-card-section>
    <q-card-section class="company-list">
      <CompanyList :isGridDisplay="isGridDisplay" v-if="companies" />
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
import { ref } from 'vue';

const { companies } = useCompanies()

const isGridDisplay = ref(false)

function toggleTableDisplay() {
  isGridDisplay.value = !isGridDisplay.value
}

</script>

<style lang="scss" scoped>
h1 {
  font-size: 2em;
  text-align: center;
  align-self: center;
  font-weight: bold;
}

img {
  max-width: 30px;
}

.company-list {
  min-height: 60vh;
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
