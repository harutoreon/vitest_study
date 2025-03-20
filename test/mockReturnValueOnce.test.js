import { it, expect, vi } from 'vitest'

it('mockReturnValueOne test', () => {
  const myMockFn = vi
    .fn()
    .mockReturnValue('default')
    .mockReturnValueOnce('first call')
    .mockReturnValueOnce('second call')

  console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn())  // 'first call', 'second call', 'default', 'default'
})