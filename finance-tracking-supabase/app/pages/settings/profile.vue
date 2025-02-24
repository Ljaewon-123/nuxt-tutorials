<template>
  <UForm :state="state" :schema="schema" @submit.prevent="saveProfile">
    <UFormGroup class="mb-4" label="Full Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup class="mb-4" label="Email" name="email"
      help="You will receive a confirmation email on both the old and the new addresses if you modify the email address">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UButton type="submit" color="black" variant="solid" label="Save" :loading="pending" :disabled="pending" />

    <div>
      <p>Exception</p>
      <h1>This User</h1>
      <div>
        {{ checkUser }}
      </div>
      <!-- <h1>This supapbase</h1>
      <div>
        {{ checkSupabase }}
      </div> -->
    </div>
  </UForm>
</template>

<script setup lang="ts">
import { z } from 'zod'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const { toastSuccess, toastError } = useAppToast()
const pending = ref(false)

const state = ref({
  name: user.value?.user_metadata?.full_name,
  email: user.value?.email
})

const checkUser = computed(() => user)
const checkSupabase = computed(() => supabase)

const schema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email()
})

const saveProfile = async () => {
  pending.value = true

  // 인증만 제대로 만들어도 재밌겠다. 

  try {
    const data = {
      data: { // user metadata에 추가하는건데 문서에는 이런말이 없는거 같은데....??? 아 있네 ㅋㅋㅋ
        full_name: state.value.name
      }
    } as any

    if (state.value.email !== user.value?.email) {
      data.email = state.value.email
    }

    console.log(data)

    const { error } = await supabase.auth.updateUser(data)
    if (error) throw error

    toastSuccess({
      title: 'Profile updated',
      description: 'Your profile has been updated'
    })
  } catch (error: any) {
    toastError({
      title: 'Error updating profile',
      description: error.message
    })
  } finally {
    pending.value = false
  }
}
</script>