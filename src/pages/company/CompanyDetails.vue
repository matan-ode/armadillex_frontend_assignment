<template>
  <q-card>
    <div class="q-pa-md">
      <q-card-section>
        <h3>Company Info</h3>
      </q-card-section>

      <q-card-section>
        <p v-if="isLoadingCompany">Loading...</p>
        <p v-else-if="errorCompany">Error: {{ errorCompany.message }}</p>
        <div v-else-if="companyDetails" class="info-company">
          <div>ID:</div>
          <div>{{ companyId }}</div>
          <div>Company Name:</div>
          <div>{{ companyDetails.name }}</div>
          <div>Address:</div>
          <div>{{ companyDetails.country }}</div>
          <div>Active:</div>
          <div>{{ companyDetails.active ? 'Yes' : 'No' }}</div>
          <div>Date Added:</div>
          <div>{{ companyDetails.dateAdded }}</div>
          <div>AI Services:</div>
          <div>{{ companyDetails.providesAiServices ? 'Yes' : 'No' }}</div>
        </div>
        <p v-else-if="!isLoadingCompany && !errorCompany && companyDetails === null">ID: {{ companyId }} Not Found</p>
        <p v-else>Loading...</p>
      </q-card-section>
      <q-card-section>
        <q-btn label="Back" color="primary" @click="goBack" class="q-mt-md" />
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { QBtn } from 'quasar'
import { useCompanies } from 'src/composables/useCompanies'

const route = useRoute()
const router = useRouter()

const companyId = computed(() => route.params.id)

// const companyDetailsEditedKeys = [
//   'ID',
//   'Active',
//   'Name',
//   'Legal Name',
//   'Country',
//   'Date Added',
//   'DPF Found',
//   'Parent ID',
//   'AI Services'
// ]


const { useCompanyById } = useCompanies()

const {
  data: companyDetails,
  isLoading: isLoadingCompany,
  error: errorCompany
} = useCompanyById(companyId.value)

function goBack() {
  router.back()
}

// watch(companyDetails, (newVal) => {
//   console.log('CompanyDetails: companyDetails (נתוני החברה) השתנה ל:', newVal);
// });
// watch(isLoadingCompany, (newVal) => {
//   console.log('CompanyDetails: isLoadingCompany (מצב טעינה) השתנה ל:', newVal);
// });
// watch(errorCompany, (newVal) => {
//   console.log('CompanyDetails: errorCompany (שגיאה) השתנה ל:', newVal);
// });
// watch(companyId, (newVal) => {
//   console.log('CompanyDetails: companyId (ID מהנתיב) השתנה ל:', newVal);
// });
</script>

<style lang="scss" scoped>
.info-company {
  // justify-self: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  font-size: 1.2em;

  max-width: fit-content;

  :nth-last-of-type(even) {
    font-weight: bold;
  }

  >* {
    &:hover {
      opacity: 90%;
    }
  }





}
</style>
