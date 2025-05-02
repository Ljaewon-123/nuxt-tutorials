<template>
  <div>
    <p>Sign Up / Sign In</p>
    <UButton @click="signUp">SignUp</UButton>
    <UButton @click="signIn">SignIn</UButton>
    <UButton
      icon="i-simple-icons-github"
      type="button"
      color="neutral"
      @click="auth.signIn.social({ provider: 'github', callbackURL: '/auth/github' })"
    >
      Sign In with Github
    </UButton>
    <UButton 
      @click="signout" 
      icon="i-heroicons-outline-arrow-right-on-rectangle"
      type="button"
      color="neutral"
      class="ml-2"
    >
      Sign Out
    </UButton>
    <UButton 
      @click="sendMagicLink" 
      icon="i-heroicons-outline-mail"
      type="button"
      color="neutral"
      class="ml-2"
    >
      Send Magic Link
    </UButton>
  </div>
</template>

<script setup lang="ts">

// const auth = authClient
const { authClient: auth, fetchSession } = useAuth()

const toast = useToast()
const loading = ref(false)
const email = ref('test@test.com')
const password = ref('12341234')  
const name = ref('jaewon1234')

async function signUp() {
  if (loading.value) return
  loading.value = true
  const { error } = await auth.signUp.email({
    email: email.value,
    password: password.value,
    name: name.value,
  })
  if (error) {
    console.error(error)
    toast.add({
      title: error.message,
      color: 'primary',
    })
  }
  else {
    toast.add({
      title: `You have been signed up!`,
    })
    await navigateTo('/')
  }
  loading.value = false
}

async function signIn() {
  if (loading.value) return
  loading.value = true
  const { error } = await auth.signIn.email({
    email: email.value,
    password: password.value,
  })
  if (error) {
    console.error(error)
    toast.add({
      title: error.message,
      color: 'primary',
    })
  }
  else {
    toast.add({
      title: `You have been signed in!`,
    })
    await navigateTo('/')
    await navigateTo('/')
    await navigateTo('/')
  }
  loading.value = false
}

async function signout() {
  const { error } = await auth.signOut()
  if (error) {
    console.error(error)
    toast.add({
      title: error.message,
      color: 'primary',
    })
  }
  else {
    toast.add({
      title: `You have been signed out!`,
    })
    await fetchSession()
    await navigateTo('/')
  }
  loading.value = false
}

async function sendMagicLink() {
  if (loading.value) return
  loading.value = true
  const { error } = await auth.signIn.magicLink({
    email: email.value,
    callbackURL: "/"
  })
  if (error) {
    console.error(error)
    toast.add({
      title: error.message,
      color: 'primary',
    })
  }
  else {
    toast.add({
      title: `Magic link sent!`,
    })
  }
  loading.value = false
}


</script>