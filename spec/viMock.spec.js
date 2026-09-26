import { describe, it, expect, vi } from 'vitest'
import { fetchUser } from './api'

vi.mock('./api', () => {
  return {
    fetchUser: vi.fn(() => Promise.resolve({ id: 1, name: 'Taro' }))
  }
})

describe('viMock', () => {
  it('ユーザー名を取得する', async () => {
    await fetchUser()

    console.log(fetchUser.mock.results[0].value)  // Promise { { id: 1, name: 'Taro' } }
    expect(fetchUser).toHaveBeenCalled(1)
  })
})
