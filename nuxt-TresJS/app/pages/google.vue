<script setup lang="ts">
interface CustomUser {
  login: string
  loggedInAt: string
}

interface CustomSession {
  loggedIn: boolean
  user: CustomUser | null
  session: any
  fetch: () => Promise<void>
  clear: () => void
  openInPopup: (url: string) => void
}

const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession() as unknown as CustomSession
</script>

<template>
  <div v-if="loggedIn">
    <h1>Welcome {{ user?.login }}!</h1>
    <p>Logged in since {{ user?.loggedInAt }}</p>
    <button @click="clear">Logout</button>
  </div>
  <div v-else>
    <h1>Not logged in</h1>
    <a href="/auth/google">Login with GooGle</a>
    <!-- or open the OAuth route in a popup -->
    <button @click="openInPopup('/auth/google')">Login with GooGle</button>
  </div>
</template>