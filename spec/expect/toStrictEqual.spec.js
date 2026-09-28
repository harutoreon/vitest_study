import { describe, it, expect } from 'vitest'

class Point {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}

describe('toStrictEqual', () => {
  it('プリミティブと構造の比較', () => {
    expect({ a: 1, b: [1, 2] }).toStrictEqual({ a: 1, b: [1, 2] })
  })

  it('undefined プロパティの扱い', () => {
    const actual = { a: 1, b: undefined }
    const expected = { a: 1 }

    expect(actual).toEqual(expected)
    expect(actual).not.toStrictEqual(expected)
  })

  it('クラスの型チェック', () => {
    const p = new Point(1, 2)

    console.log(p)  // Point { x: 1, y: 2 }

    expect(p).toEqual({ x: 1, y: 2 })
    expect(p).not.toStrictEqual({ x: 1, y: 2 })
    expect(p).toStrictEqual(new Point(1, 2))
  })

  it('疎配列の扱い', () => {
    expect([, 1]).toEqual([undefined, 1])
    expect([, 1]).not.toStrictEqual([undefined, 1])
  })
})
