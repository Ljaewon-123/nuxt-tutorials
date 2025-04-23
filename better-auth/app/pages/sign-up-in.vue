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
  </div>
</template>

<script setup lang="ts">

const auth = authClient

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
  }
  loading.value = false
}

async function signout() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: async () => {
        // redirect to login page
        toast.add({
          title: `You have been signed out!`,
        })
        await navigateTo('/')
      },
    },
  });
}



</script>