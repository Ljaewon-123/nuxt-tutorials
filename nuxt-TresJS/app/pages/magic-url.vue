<template>
  <div class="card flex justify-center">
    <Toast />

    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-60">
      <div class="flex flex-col gap-1">
        <InputText name="email" type="text" placeholder="Email" fluid />
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message }}</Message>
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>

<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { render } from '@vue-email/render';
import { z } from 'zod';

interface Res {
  success: boolean 
  token: string
}

const config = useRuntimeConfig()
const mail = useMail()

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

const toast = useToast();

const initialValues = ref({
  email: '',
});

const resolver = zodResolver(
  z.object({
    email: z.string().min(1, { message: 'Email is required.' }),
  })
);

const onFormSubmit = async(e: any) => {
  // e.originalEvent: Represents the native form submit event.
  // e.valid: A boolean that indicates whether the form is valid or not.
  // e.states: Contains the current state of each form field, including validity status.
  // e.errors: An object that holds any validation errors for the invalid fields in the form.
  // e.values: An object containing the current values of all form fields.
  // e.reset: A function that resets the form to its initial state.

  if (e.valid) {
    toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
  }

  try {
    sendEmail()
  } catch (error) {
    console.error(error)
  }

};
</script>