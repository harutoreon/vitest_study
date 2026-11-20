import { describe, it, expect } from 'vitest'

type User = {
  id: number
  name: string
}

function findUser(users: readonly User[], id: number): User | null {
  return users.find((u) => u.id === id) ?? null
}

describe('findUser', () => {
  const users: readonly User[] = [
    { id: 1, name: 'Alice' },
  ]

  it('存在しない ID なら null を返す', ()=> {
    expect(findUser(users, 999)).toBeNull()
  })

  it('存在する ID ならユーザー情報を返す', () => {
    expect(findUser(users, 1)).toEqual({ id: 1, name: 'Alice' })
  })

  it('ユーザーが空配列なら null を返す', () => {
    expect(findUser([], 1)).toBeNull()
  })
})
