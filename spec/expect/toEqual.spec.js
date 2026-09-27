import { describe, it, expect } from 'vitest'

describe('toEqual', () => {
  it('オブジェクトの比較', () => {
    expect({ name: 'Alice', age: 30 }).toEqual({ age: 30, name: 'Alice' })  // プロパティが入れ違ってもパスする
  })

  it('undefined は無視される', () => {
    expect({ a: 1, b: undefined }).toEqual({ a: 1 })  // 値が undefined
    expect({ a: 1, undefined: undefined }).toEqual({ a: 1 })  // プロパティが undefined
  })

  it('ネストしたデータ構造', () => {
    const result = {
      user: { name: 'Bob', roles: ['admin', 'editor'] },
      meta: { count : 2 }
    }

    expect(result).toEqual({
      user: { name: 'Bob', roles: ['admin', 'editor'] },
      meta: { count : 2 }
    })
  })

  it('オブジェクトの部分一致', () => {
    const result = {
      user: { name: 'Bob', roles: ['admin', 'editor'] },
      meta: { count : 2 }
    }

    expect(result).toEqual(
      expect.objectContaining({ user: expect.objectContaining({ name: 'Bob' }) }),
    )
  })

  it('否定形', () => {
    expect({ name: 'Alice', age: 30 }).not.toEqual({ age: 30, name: 'Bob' })
  })
})
