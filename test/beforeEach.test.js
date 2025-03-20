import { describe, expect, test, beforeEach } from 'vitest'
				
let count = 0

beforeEach(() => {
  count = 10
})

describe('beforeEach の動作確認', () => {
  test('count を加算', () => {
    count += 5

    expect(count).toBe(15)
  })
  
  test('count を減算', () => {
    count -= 3
    
    expect(count).toBe(7)
  })
})
