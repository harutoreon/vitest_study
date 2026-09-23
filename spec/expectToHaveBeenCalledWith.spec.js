import { describe, it, expect, vi } from 'vitest'

describe('toHaveBeenCalledWith', () => {
  it('正しい引数で呼び出される', () => {
    const mockFn = vi.fn()

    mockFn('hello', 123)

    console.log(mockFn.mock.calls)  // [ [ 'hello', 123 ] ]
    expect(mockFn).toHaveBeenCalledWith('hello', 123)
  })

  it('関数呼び出しの引数を検証する', () => {
    const saveUser = vi.fn()

    function registerUser(name, email) {
      saveUser({ name, email, createdAt: expect.any(Date) })
    }

    registerUser('Taro', 'taro@example.com')

    console.log(saveUser.mock.calls)  // [ [ { name: 'Taro', email: 'taro@example.com', createdAt: [Any] } ] ]
    expect(saveUser).toHaveBeenCalledWith({
      name: 'Taro',
      email: 'taro@example.com',
      createdAt: expect.any(Date),
    })
  })


})
