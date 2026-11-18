import { describe, it, expect, vi } from 'vitest'
import { fetchUser } from '../api.js'
import { getUserName } from '../user.js'

vi.mock('../api.js')  // モジュール全体を自動モック化

describe('getUserName', () => {
  it('APIの結果から名前を返す', async () => {
  // 型が MockedFunction になり、mockResolvedValue の引数も型チェックされる
  vi.mocked(fetchUser).mockResolvedValue({ id: 1, name: 'Taro' })
    
  expect(await getUserName(1)).toBe('Taro')
  expect(vi.mocked(fetchUser)).toHaveBeenCalledWith(1)
  })
})