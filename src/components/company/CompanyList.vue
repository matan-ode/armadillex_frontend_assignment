<template>

  <div class="q-pa-md">
    <q-table @row-click="onRowClick" flat bordered title="Companies" :rows="rows" :columns="columns" row-key="id"
      :filter="filter" :loading="loading">
      <template v-slot:top>
        <q-btn label="Add a Company" color="primary" @click="prompt = true" />
        <q-space />
        <q-input borderless dense debounce="300" color="primary" placeholder="Search" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>

  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Company Name:</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="aiName" autofocus @keyup.enter="aiGenerateNames" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <!-- <q-btn flat label="Add address" v-close-popup /> -->
          <q-btn color="primary" :disable="loading" label="AI Generator" @click="aiGenerateNames" v-close-popup />

        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>

</template>

<script setup>
import { defineProps, ref, onBeforeUnmount } from 'vue'
import { useQuasar } from 'quasar'
import { getRandomIntInclusive } from 'src/services/util.service'

const props = defineProps({
  companies: Array
})

const columns = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: false },
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: row => row.name,
    sortable: true
  },
  { name: 'active', align: 'center', label: 'Is Active', field: row => row.active ? 'Yes' : 'No', sortable: true },
  { name: 'country', align: 'center', label: 'Country', field: 'country', sortable: true },
  { name: 'dateAdded', align: 'center', label: 'Date Added', field: 'dateAdded', sortable: true, },
  { name: 'isDpfFound', align: 'center', label: 'is DPF Found', field: row => row.isDpfFound ? 'Yes' : 'No', sortable: true },
  { name: 'providesAiServices', align: 'center', label: 'Provides AI Services', field: row => row.providesAiServices ? 'Yes' : 'No', sortable: true },
  { name: 'parentId', align: 'center', label: 'Parent ID', field: row => row.parentId ? row.parentId : 'None' },
  { name: 'legalName', align: 'center', label: 'Legal Name', field: 'legalName', sortable: true }
]

const originalRows = props.companies

const loading = ref(false)
const filter = ref('')
const rows = ref([...originalRows])
const prompt = ref(false)
const aiName = ref('')
const aiSuggestions = ref([])

const $q = useQuasar()
let timer

function onRowClick(ev, row) {

  console.log('clicked on row', row, ev);

}

onBeforeUnmount(() => {
  // void 0 similar to undefined
  if (timer !== void 0) {
    clearTimeout(timer)
    $q.loading.hide()
  }
})

function aiGenerateNames() {
  makeAiSuggestions(aiName.value)
  prompt.value = false
  aiName.value = ''
  showLoading()
}

function showLoading() {
  $q.loading.show({
    message: 'Generating AI suggestions...',
    boxClass: 'bg-grey-2 text-grey-9',
    spinnerColor: 'primary'
  })

  // hiding in 3s
  timer = setTimeout(() => {
    $q.loading.hide()
    timer = void 0
    // TODO: Add here onFunc that preset modal of radio buttons with AI suggests.
    
  }, 3000)
}

function makeAiSuggestions(name) {
  const nameEndings = ['Solutions', 'Group', 'International', 'Corp', 'Inc', 'LLC', 'Partners', 'Holdings', '& Son', '& Co', 'Ltd.', 'Brands']
  const nameSuggestions = []
  for (let i = 0; i < 3; i++) {
    const randIdx = getRandomIntInclusive(0, nameEndings.length - 1)
    nameSuggestions.push(name + ` ${nameEndings[randIdx]}`)
    nameEndings.splice(randIdx, 1)
  }

  aiSuggestions.value = nameSuggestions
}





</script>

<style scoped lang="scss"></style>


<!-- "id": "pAuC6RQ71bBG",
    "active": true,
    "name": "Market Data Insights LLC",
    "legalName": "Market Data Insights LLC",
    "country": "USA",
    "dateAdded": "Sun, 26 Jan 2025 16:54:36 GMT",
    "isDpfFound": false,
    "parentId": "hDQkIp9PldZO",
    "providesAiServices": true -->
