import { ref, type Ref } from 'vue'
import type { BaseServiceInstance, PaginatedResponse, ListParams } from '@/services/BaseService'

export function useApi<T>(service: BaseServiceInstance<T>) {
  const items: Ref<T[]> = ref([])
  const item: Ref<T | null> = ref(null) as Ref<T | null>
  const meta: Ref<PaginatedResponse<T>['meta'] | null> = ref(null)
  const loading = ref(false)
  const error = ref('')

  async function fetchAll(params?: ListParams) {
    loading.value = true
    error.value = ''
    try {
      const response = await service.getAll(params)
      items.value = response.data as T[]
      meta.value = response.meta
      return response
    } catch (e: unknown) {
      const apiErr = e as { message?: string }
      error.value = apiErr?.message || 'Errore nel caricamento dei dati'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function fetchOne(id: number) {
    loading.value = true
    error.value = ''
    try {
      const response = await service.getOne(id)
      item.value = response as T
      return response
    } catch (e: unknown) {
      const apiErr = e as { message?: string }
      error.value = apiErr?.message || 'Errore nel caricamento del dato'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function create(data: Partial<T>) {
    loading.value = true
    error.value = ''
    try {
      const response = await service.create(data)
      return response
    } catch (e: unknown) {
      const apiErr = e as { message?: string }
      error.value = apiErr?.message || 'Errore nella creazione'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function update(id: number, data: Partial<T>) {
    loading.value = true
    error.value = ''
    try {
      const response = await service.update(id, data)
      return response
    } catch (e: unknown) {
      const apiErr = e as { message?: string }
      error.value = apiErr?.message || "Errore nell'aggiornamento"
      throw e
    } finally {
      loading.value = false
    }
  }

  async function remove(id: number) {
    loading.value = true
    error.value = ''
    try {
      await service.remove(id)
    } catch (e: unknown) {
      const apiErr = e as { message?: string }
      error.value = apiErr?.message || "Errore nell'eliminazione"
      throw e
    } finally {
      loading.value = false
    }
  }

  return { items, item, meta, loading, error, fetchAll, fetchOne, create, update, remove }
}
