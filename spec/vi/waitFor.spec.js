import { describe, it, expect, vi } from 'vitest'

describe('waitFor', () => {
  it('非同期に状態が変わるのを待つ', async () => {
    let ready = false
    setTimeout(() => { ready = true}, 200)

    await vi.waitFor(() => {
      expect(ready).toBe(true)
    })
  })
})
