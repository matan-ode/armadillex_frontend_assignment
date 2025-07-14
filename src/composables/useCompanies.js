import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { companiesService } from 'src/services/api/companies.service'
import { QUERY_KEYS } from './const'
import { notifyMsgs, notifyService } from 'src/services/notify.service'

export function useCompanies() {
  const queryClient = useQueryClient()

  const companiesQuery = useQuery({
    queryKey: [QUERY_KEYS.COMPANIES],
    queryFn: async () => {
      const companies = await companiesService.getCompanies()
      notifyService.success(notifyMsgs.companiesFetched)
      return companies
    },
  })

  const addCompanyMutation = useMutation({
    mutationFn: async (newCompanyData) => {
      const createdCompany = await companiesService.addCompany(newCompanyData)
      return createdCompany
    },
    onSuccess: (data) => {
      console.log('addCompanyMutation SUCCESS! Created company:', data)
      queryClient.invalidateQueries([QUERY_KEYS.COMPANIES])
      notifyService.success(notifyMsgs.companyAdded)
    },
    onError: (error) => {
      console.error('addCompanyMutation FAILED!', error)
    },
  })

  return {
    // Query state
    companies: companiesQuery.data,
    isLoading: companiesQuery.isLoading,
    error: companiesQuery.error,

    // Add company
    addCompany: addCompanyMutation.mutate,
    isAddingCompany: addCompanyMutation.isPending,
  }
}
