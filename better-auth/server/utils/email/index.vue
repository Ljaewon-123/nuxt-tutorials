<script setup lang="ts">
import { Html, Button, Container, Tailwind, Head, Body, Section, Text, Link } from '@vue-email/components'

interface Props {
  token: string
}

const { token } = defineProps<Props>()
const magicLink = `http://localhost:3000/auth/magic-link?token=${token}`
</script>

<template>
  <Html>
    <Head />
    <Tailwind>
      <Body class="bg-gray-100 text-gray-900">
        <Container class="mx-auto my-10 p-6 bg-white shadow-md rounded-lg max-w-md">
          <Section class="text-center">
            <h1 class="text-2xl font-bold text-gray-900">🔗 Magic Link 로그인</h1>
            <Text class="text-gray-700 mt-2">아래 버튼을 클릭하여 로그인하세요:</Text>
          </Section>

          <Section class="mt-4 text-center">
            <Button :href="magicLink" class="bg-[#00DC82] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:opacity-90">
              로그인하기 →
            </Button>
          </Section>

          <Section class="mt-6 text-center text-gray-600 text-sm">
            <Text>버튼이 작동하지 않으면 아래 링크를 복사하여 브라우저에 붙여넣으세요.</Text>
            <Link :href="magicLink" class="text-[#00DC82] break-all">{{ magicLink }}</Link>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
</template>