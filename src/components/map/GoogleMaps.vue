<template>
  <GoogleMap api-key="AIzaSyDcxHTWrhF8QyQqFrlc44h3WB-8wSVuVhk" style="width: 100%; height: 500px" :center="center"
    :zoom="15">
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'


const center = { lat: 40.689247, lng: -74.044502 }

</script>
