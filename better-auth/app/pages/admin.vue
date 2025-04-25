<script setup lang="ts">
// const auth = authClient
const { authClient } = useAuth()
const toast = useToast()

const createUser = async () => {
  const { error } = await authClient.admin.createUser({
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    role: "user", // this can also be an array for multiple roles (e.g. ["user", "sale"])
  });
  if (error) {
    toast.add({
      title: "Failed to create user"
    });
  } else {
    toast.add({
      title: "User created successfully!",
      description: "The user has been created successfully."
    });
  }
}

const deleteUser = async () => {
  const { error } = await authClient.admin.removeUser({
    userId: "40eChte1HglUTulRr121lCqHp2VGUPab",
  })
  if (error) {
    toast.add({
      title: "Failed to delete user"
    });
  } else {
    toast.add({
      title: "User delete successfully!",
      description: "The user has been delete successfully."
    });
  }
}

const listUsers = async () => {
  return await authClient.admin.listUsers({
      query: {
          searchField: "email",
          searchValue: "@example.com",
          limit: 10,
          offset: 0,
          sortBy: "createdAt",
          sortDirection: "desc",
      }
  });
}

const { data, error, execute } = await useLazyAsyncData('admin-list', listUsers)




</script>

<template>
  <UCard variant="subtle">
    <template #header>
      <h3>
        Admin
      </h3>
    </template>
    <div>
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Admin Page</h1>
        <p>Welcome to the admin page!</p>
        <p>This is a protected route.</p>
        <p>Info</p>
        User List: {{ data }}
        <p class="text-red-500">Error: {{ error }}</p>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton @click="createUser()">Create User</UButton>
      </div>
      <div class="flex justify-end gap-2 my-2">
        <UButton @click="deleteUser()">Delete User</UButton>
      </div>
      <div class="flex justify-end gap-2">
        <UButton @click="execute()">List User</UButton>
      </div>
    </template>
  </UCard>
</template>