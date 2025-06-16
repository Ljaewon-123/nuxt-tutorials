import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport, renderSuspended } from '@nuxt/test-utils/runtime'
import ComponentA from '~/components/ComponentA.vue'

// Nuxt composables 모킹
const mockUseState = vi.fn()
const mockUseAsyncData = vi.fn()
const mockParseErrorData = vi.fn()
const mock$fetch = vi.fn()

mockNuxtImport('useState', () => mockUseState)
mockNuxtImport('useAsyncData', () => mockUseAsyncData)
mockNuxtImport('parseErrorData', () => mockParseErrorData)
mockNuxtImport('$fetch', () => mock$fetch)

describe('ComponentA', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render initial state correctly', async () => {
    // useState 모킹
    const mockId = { value: 1 }
    mockUseState.mockReturnValue(mockId)

    // useAsyncData 모킹
    const mockExecute = vi.fn()
    mockUseAsyncData.mockResolvedValue({
      data: { value: { message: 'found user1', user: { id: 1, email: 'email@email.com' } } },
      status: { value: 'success' },
      execute: mockExecute,
      error: { value: null }
    })

    const wrapper = await renderSuspended(ComponentA)

    expect(wrapper.text()).toContain('Current ID: 1')
    expect(wrapper.text()).toContain('found user1')
    expect(wrapper.text()).toContain('email@email.com')
  })

  it('should handle button click and execute', async () => {
    const mockId = { value: 1 }
    const mockExecute = vi.fn()
    
    mockUseState.mockReturnValue(mockId)
    mockUseAsyncData.mockResolvedValue({
      data: { value: null },
      status: { value: 'pending' },
      execute: mockExecute,
      error: { value: null }
    })

    const wrapper = await renderSuspended(ComponentA)
    const button = wrapper.find('button')

    await button.trigger('click')

    expect(mockId.value).toBe(2) // id가 증가했는지 확인
    expect(mockExecute).toHaveBeenCalled() // execute가 호출되었는지 확인
  })

  it('should handle error state', async () => {
    const mockId = { value: 1 }
    const mockError = { value: { statusCode: 400, message: 'User not found' } }
    
    mockUseState.mockReturnValue(mockId)
    mockUseAsyncData.mockResolvedValue({
      data: { value: null },
      status: { value: 'error' },
      execute: vi.fn(),
      error: mockError
    })
    
    mockParseErrorData.mockReturnValue({ message: 'User not found' })

    const wrapper = await renderSuspended(ComponentA)

    expect(wrapper.text()).toContain('User not found')
    expect(mockParseErrorData).toHaveBeenCalledWith(mockError)
  })

  it('should show loading state', async () => {
    const mockId = { value: 1 }
    
    mockUseState.mockReturnValue(mockId)
    mockUseAsyncData.mockResolvedValue({
      data: { value: null },
      status: { value: 'pending' },
      execute: vi.fn(),
      error: { value: null }
    })

    const wrapper = await renderSuspended(ComponentA)

    expect(wrapper.text()).toContain('pending')
  })
})
