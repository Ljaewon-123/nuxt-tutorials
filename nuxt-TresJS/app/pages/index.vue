<script setup lang="ts">
import { render } from '@vue-email/render';

definePageMeta({
  middleware: ['authenticated'],
})
  
const { user, clear: clearSession } = useUserSession()

async function logout() {
  await clearSession()
  await navigateTo('/login')
}

const config = useRuntimeConfig()
const mail = useMail()

interface Res {
  success: boolean 
  token: string
}

const sendEmail = async() => {
  const { token } = await $fetch<Res>('/api/auth/generate-magic-link',{
    method: 'POST',
    body: {
      email: config.public.mail.to
    }
  })
  mail.send({
    to: config.public.mail.to,
    from: config.public.mail.to,
    subject: 'Testing Nest MailerModule ✔', // Subject line
    html: await render(h(resolveComponent('Email'), { token }))
  })
}

</script>

<template>
  <div>
    <h1>Welcome {{ user?.name }}</h1>
    <button @click="logout">Logout</button>
    <Button @click="sendEmail" label="Send Email" variant="text" raised />
  </div>
</template>
