<template>

  <div class="q-pa-md">
    <q-table class="table-company-list" @row-click="onRowClick" flat bordered title="Companies" :rows="companies"
      :columns="columns" row-key="id" :filter="filter" :loading="isLoading || isAddingCompany">
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

  <!-- Prompt / Modal -->
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Company Name</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="aiNameInput" autofocus @keyup.enter="aiGenerateNames" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <!-- <q-btn flat label="Add address" v-close-popup /> -->
          <q-btn color="primary" :disable="isLoadingAI" label="AI Generator" @click="aiGenerateNames" v-close-popup />

        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Radio Options -->
    <q-dialog v-model="radioDialogVisible" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="q-pb-none">
          <div class="text-h6">Choose an AI Option</div>
        </q-card-section>

        <q-card-section>
          <q-list>
            <q-item v-for="option in aiSuggestions" :key="option" tag="label" v-ripple>
              <q-item-section avatar>
                <q-radio v-model="selectedOption" :val="option" color="teal" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ option }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Retry" color="negative" @click="retryRadioDialog" />
          <q-btn flat label="Skip" color="primary" @click="skipRadioDialog" />
          <q-btn flat label="OK" color="primary" @click="confirmRadioDialog" :disable="!selectedOption" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, watch } from 'vue'
import { useQuasar } from 'quasar'
import { getRandomIntInclusive } from 'src/services/util.service'
import { useCompanies } from 'src/composables/useCompanies'
import { useRouter } from 'vue-router'
import { ROUTES } from 'src/router/const'

const router = useRouter()

const { companies, isLoading, error, addCompany, isAddingCompany } = useCompanies()

async function onAddCompany(companyName) {

  try {
    const newCompanyData = {
      name: companyName,
      active: true,
      country: 'Unknown',
      legalName: companyName,
      providesAiServices: false,

    }

    addCompany(newCompanyData)

    $q.notify({
      type: 'positive',
      message: 'Company added successfully!',
      position: 'top',
    })

    aiNameInput.value = ''
    prompt.value = false
    radioDialogVisible.value = false
    selectedOption.value = null

  } catch (err) {
    console.error('Failed to add company:', err);
    $q.notify({
      type: 'negative',
      message: `Failed to add company: ${err.message || 'Unknown error'}`,
      position: 'top',
    });
  }
}

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


const isLoadingAI = ref(false)
const filter = ref('')
const prompt = ref(false)
const aiNameInput = ref('')

const aiSuggestions = ref([])

const radioDialogVisible = ref(false)
const selectedOption = ref(null)


const $q = useQuasar()
let timer

function onRowClick(ev, row) {
  router.push(`/${ROUTES.COMPANY}/${row.id}`)
}

onBeforeUnmount(() => {
  // void 0 similar to undefined
  if (timer !== void 0) {
    clearTimeout(timer)
    $q.loading.hide()
  }
})

watch(isLoading, (newVal, oldVal) => {
  if (!newVal && oldVal) { // Finished loading
    if (error.value) {
      $q.notify({
        type: 'negative',
        message: `Failed to load companies: ${error.value.message || 'Unknown error'}`,
        position: 'top'
      })
    } else if (companies.value?.length > 0) {
      $q.notify({
        type: 'positive',
        message: 'Companies loaded successfully!',
        position: 'top'
      })
    }
  }
}, { immediate: true })


function aiGenerateNames() {
  isLoadingAI.value = true
  prompt.value = false
  makeAiSuggestions(aiNameInput.value)

  showLoading()

  timer = setTimeout(() => {
    $q.loading.hide()
    isLoadingAI.value = false
    timer = void 0
    radioDialogVisible.value = true
  }, 3000)
}

function showLoading() {
  $q.loading.show({
    message: 'Generating AI suggestions...',
    boxClass: 'bg-grey-2 text-grey-9',
    spinnerColor: 'primary'
  })
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
  console.log(aiSuggestions.value)
}

function confirmRadioDialog() {
  if (selectedOption.value) {
    onAddCompany(selectedOption.value)
  }
}

function skipRadioDialog() {
  onAddCompany(aiNameInput.value)
}

function retryRadioDialog() {
  selectedOption.value = null
  radioDialogVisible.value = false
  aiGenerateNames()
}


</script>

<style scoped lang="scss"></style>
