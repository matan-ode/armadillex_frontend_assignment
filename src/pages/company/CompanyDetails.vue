<template>
  <div class="q-pa-md">
    <h3>Company Info</h3>

    <p v-if="isLoadingCompany">Loading...</p>
    <p v-else-if="errorCompany">Error: {{ errorCompany.message }}</p>
    <p v-else-if="companyDetails">
      <strong>ID:</strong> {{ companyId }} <br>
      <strong>Company Name:</strong> {{ companyDetails.name }} <br>
      <strong>Address</strong>: {{ companyDetails.country }} <br>
      <strong>Active</strong>: {{ companyDetails.active ? 'Yes' : 'No' }} <br>
      <strong>Date Added:</strong> {{ companyDetails.dateAdded }} <br>
      <strong>AI Services:</strong> {{ companyDetails.providesAiServices ? 'Yes' : 'No' }}
    </p>
    <p v-else-if="!isLoadingCompany && !errorCompany && companyDetails === null">ID: {{ companyId }} Not Found</p>
    <p v-else>Loading...</p>

    <q-btn label="Back" color="primary" @click="goBack" class="q-mt-md" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { QBtn } from 'quasar'
import { useCompanies } from 'src/composables/useCompanies'

const route = useRoute()
const router = useRouter()

const companyId = computed(() => route.params.id)

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
