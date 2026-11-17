import { describe, it, expect } from 'vitest'

type User = {
  id: number
  name: string
  role: string
  createdAt: Date
}

type Response = {
  date: {
    user: { id: number, name: string, email: string },
    meta: { requestId: string }
  }
}

type Item = {
  id: number
  name: string
  price: number
}

describe('toMatchObject', () => {
  it('部分一致', () => {
    const user: User = { id: 1, name: 'Alice', role: 'admin', createdAt: new Date() }

    expect(user).toMatchObject({ name: 'Alice', role: 'admin' })
  })

  it('ネストしたオブジェクトの部分一致', () => {
    const response: Response = {
      date: {
        user: { id: 1, name: 'Alice', email: 'alice@example.com' },
        meta: { requestId: 'abc' }
      }
    }

    expect(response).toMatchObject({
      date: { user: { name: 'Alice' } },
    })
  })

  it('配列の部分一致', () => {
    const items: Item[] = [
      { id: 1, name: 'A', price: 100 },
      { id: 1, name: 'B', price: 200 },
    ]

    expect(items).toMatchObject([
      { name: 'A' },
      { name: 'B' },
    ])
  })

  it('オブジェクト内の配列プロパティは要素数を含めて完全一致のみ', () => {
    expect({ tags: ['a', 'b', 'c'] }).not.toMatchObject({ tags: ['a', 'b'] })
  })

  it('非対称マッチャーとの併用', () => {
    const user: User = { id: 1, name: 'Alice', role: 'admin', createdAt: new Date() }

    expect(user).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      createdAt: expect.any(Date),
    })
  })
})
