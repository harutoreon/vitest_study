import { describe, it, expect } from 'vitest'

class User {
  // ...
}

describe('toBeInstanceOf test', () => {
  it('user は User クラスのインスタンであること', () => {
    const user = new User()

    expect(user).toBeInstanceOf(User)
  })
})
