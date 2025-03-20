import { describe, expect, it, vi } from 'vitest'

const user = {
  greet: () => 'Hello, World!',
}

describe('vi.restoreAllMocks', () => {
  it('spyOn を restoreAllMocks で元に戻す', () => {
    const spy = vi.spyOn(user, 'greet').mockReturnValue('Mocked!')

    expect(user.greet()).toBe('Mocked!')

    vi.restoreAllMocks()

    expect(user.greet()).toBe('Hello, World!')
  })
})
