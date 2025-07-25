<template>
  <q-card>
    <div class="q-pa-md">

      <q-card-section v-if="companyDetails">
        <h3>Company Info - {{ companyDetails.name }}</h3>
        <img title="Provides AI Services" class="ai-logo" v-if="companyDetails.providesAiServices"
          src="../../assets/icons/ai-logo2.avif" alt="">
      </q-card-section>

      <q-card-section>
        <p v-if="isLoadingCompany">Loading...</p>
        <p v-else-if="errorCompany">Error: {{ errorCompany.message }}</p>

        <div v-else-if="companyDetails" class="info-company">

          <section class="left-side-details">
            <div>ID:</div>
            <div>{{ companyId }}</div>
            <div>Name:</div>
            <div>{{ companyDetails.name }}</div>
            <div>Address:</div>
            <div>{{ countriesCodeMap[companyDetails.country].countryName }}</div>
            <div>Active:</div>
            <div :class="companyDetails.active ? 'text-green' : 'text-red'">{{ companyDetails.active ? 'Yes' : 'No' }}
            </div>
            <div>Date Added:</div>
            <div>{{ companyDetails.dateAdded }}</div>
            <div>AI Services:</div>
            <div :class="companyDetails.providesAiServices ? 'text-green' : 'text-red'">{{
              companyDetails.providesAiServices ? 'Yes' : 'No' }}</div>
          </section>

          <section class="right-side-details">
            <img class="flag-img"
              :src="`https://flagicons.lipis.dev/flags/4x3/${getFlagCode(companyDetails.country)}.svg`">
          </section>

        </div>

        <p v-else-if="!isLoadingCompany && !errorCompany && companyDetails === null">ID: {{ companyId }} Not Found</p>
        <p v-else>Loading...</p>
      </q-card-section>

      <q-card-section>
        <q-btn label="Back" color="primary" @click="goBack" class="q-mt-md" />
      </q-card-section>

    </div>

    <div v-if="companyDetails">
      <GoogleMaps :country="companyDetails.country" />
    </div>

  </q-card>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { QBtn } from 'quasar'
import { useCompanies } from 'src/composables/useCompanies'
import { countriesCodeMap } from 'src/assets/jsons/countries'
import GoogleMaps from 'src/components/map/GoogleMaps.vue'

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

function getFlagCode(country) {
  return countriesCodeMap[country].alpha2Code.toLowerCase()
}

</script>

<style lang="scss" scoped>
h3 {
  font-size: 2.4em;
  text-align: center;

  font-weight: bold;
}

.info-company {
  display: flex;
  justify-content: space-around;
  gap: 2em;


  .left-side-details {
    // justify-self: center;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;

    font-size: 1.2em;

    max-width: fit-content;

    :nth-last-of-type(even) {
      font-weight: bold;
    }

    >* {
      padding: 0 0.3em;

      &:hover {
        opacity: 85%;
      }
    }

  }

  .right-side-details {
    display: flex;
    flex-direction: column;

    img {
      width: 50%;
      border-radius: 8px;
    }
  }
}

.ai-logo {
  position: absolute;
  width: 2.5em;
  height: 2.5em;

  top: -14px;
  right: -14px;
  border-radius: 50%;
  opacity: 90%;

  transition: 550ms;

  &:hover {
    opacity: 60%;
  }
}

.text-red {
  color: red
}

.text-green {
  color: green
}
</style>
