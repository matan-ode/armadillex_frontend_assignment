<template>
  <GoogleMap api-key="AIzaSyDcxHTWrhF8QyQqFrlc44h3WB-8wSVuVhk" style="width: 100%; height: 500px" :center="center"
    :zoom="5">
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'
import { defineProps, ref } from 'vue'
import { countriesCodeMap } from 'src/assets/jsons/countries'

const props = defineProps({
  country: String,
})

const countryLat = ref(countriesCodeMap[props.country].center[0])
const countryLng = ref(countriesCodeMap[props.country].center[1])

const center = ref({ lat: (countryLat.value? countryLat:40.689247), lng: countryLng.value? countryLng: -74.044502 })

</script>
