import { describe, it, expect, vi } from 'vitest'

describe('resolves', () => {
  const fetchUser = async (id) => ({ id, name: 'Alice' })
  const getItems = async () => ['a', 'b', 'c']
  const saveLog = async (message) => {}

  it('ユーザーを返す', async () => {
    await expect(fetchUser(1)).resolves.toEqual({ id: 1, name: 'Alice' })
  })

  it('配列の検証', async () => {
    await expect(getItems()).resolves.toHaveLength(3)
    await expect(getItems()).resolves.toContain('b')
    await expect(getItems()).resolves.toEqual(['a', 'b', 'c'])
  })

  it('部分一致の検証', async () => {
    await expect(fetchUser(1)).resolves.toMatchObject({ name: 'Alice' })
  })

  it('例外を投げずに完了する', async () => {
    await expect(saveLog('hello')).resolves.toBeUndefined()
  })

  it('モックの戻り値を検証', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true })

    await expect(mockFetch()).resolves.toEqual({ ok: true })
  })
})
