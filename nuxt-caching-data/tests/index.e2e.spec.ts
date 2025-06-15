import { setup, createPage, fetch, $fetch } from '@nuxt/test-utils/e2e'
import { describe, it, expect } from 'vitest'

describe('login page', async () => {
  await setup({
    host: 'http://localhost:3000',
    browser: true
  })

  it('displays the email and password fields', async () => {
    const page = await createPage('/index')
    console.log(page)
  })

  it('ssr:html', async() => {
    const html = await $fetch('/')
  })

  it('ssr:response', async() => {
    const res = await fetch('/')
    const { body, headers } = res
  })
})
