<template>
  <UForm :state="state" :schema="schema" @submit.prevent="saveSettings">
    <UFormGroup label="Transaction View" class="mb-4" help="Choose how you would like to view transactions">
      <USelect v-model="state.transactionView" />
    </UFormGroup>

    <UButton type="submit" color="black" variant="solid" label="Save" :loading="pending" :disabled="pending" />
  </UForm>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { transactionViewOptions } from '~/constants/transaction'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { toastSuccess, toastError } = useAppToast()
const pending = ref(false)
const state = ref({
  transactionView: null // Initialization goes here
})
const schema = z.object({
  transactionView: z.enum(transactionViewOptions) // ZOD constraints goes here
})

const saveSettings = async () => {
  pending.value = true

  try {
    const { error } = await supabase.auth.updateUser(
      data: {
        transaction_view: state.value.transactionView
      }
    )
    if (error) throw error
    toastSuccess({
      title: 'Settings updated',
    })
  } catch (error: any) {
    toastError({
      title: 'Error updating settings',
      description: error.message,
    })
  } finally {
    pending.value = false
  }
}
</script>