import { describe, it, expect, vi } from 'vitest'
import * as api from '../api'

describe('mockImplementation', () => {
  it('基本形', () => {
    const fn = vi.fn()
    fn.mockImplementation((a, b) => a + b)

    expect(fn(1, 2)).toBe(3)
    expect(fn).toHaveBeenCalledWith(1, 2)
  })

  it('テストユーザーを取得する', async () => {
    const fetchUser = vi.fn()

    fetchUser.mockImplementation(async (id) => {
      return {
        id,
        name: 'Test User',
      }
    })

    const user = await fetchUser(1)

    expect(user.name).toBe('Test User')
  })

  it('API からユーザーを取得する', async () => {
    const spy = vi.spyOn(api, 'fetchUser').mockImplementation(async () => {
      return {
        id: 1,
        name: 'Mocked',
      }
    })

    await expect(spy()).resolves.toEqual({ id: 1, name: 'Mocked'})
  })

  it('例外を投げさせる', async () => {
    const fetchUser = vi.fn()

    vi.mocked(fetchUser).mockImplementation(async () => {
      throw new Error('Network Error')
    })

    await expect(fetchUser(1)).rejects.toThrow('Network Error')
  })

  it('呼び出しごとに振る舞いを変える', () => {
    const fn = vi.fn()
    fn.mockImplementationOnce(() => 'first')
      .mockImplementationOnce(() => 'second')
      .mockImplementation(() => 'default')
    
    fn()
    fn()
    fn()
    fn()

    expect(fn.mock.results[0].value).toBe('first')
    expect(fn.mock.results[1].value).toBe('second')
    expect(fn.mock.results[2].value).toBe('default')
    expect(fn.mock.results[3].value).toBe('default')
  })
})
