import { describe, expect, test, afterEach } from 'vitest'
				
let data = []

afterEach(() => {
  data = []
})

describe('afterEach の動作確認', () => {
  test('データを追加', () => {
    data.push(1)

    expect(data.length).toBe(1)
  })
  
  test('データはリセットされる', () => {
    expect(data.length).toBe(0)
  })
})
