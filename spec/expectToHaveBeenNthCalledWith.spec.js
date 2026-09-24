import { describe, it, expect, vi } from 'vitest'

describe('expectToHaveBeenNthCalledWith', () => {
  it('ユーザーごとに順番に通知する', () => {
    const send = vi.fn();

    ['alice', 'bob', 'carol'].forEach((name) => send(name, 'hello'))

    console.log(send.mock.calls)  // [ [ 'alice', 'hello' ], [ 'bob', 'hello' ], [ 'carol', 'hello' ] ]
    expect(send).toHaveBeenCalledTimes(3)
    expect(send).toHaveBeenNthCalledWith(1, 'alice', 'hello')
    expect(send).toHaveBeenNthCalledWith(2, 'bob', 'hello')
    expect(send).toHaveBeenNthCalledWith(3, 'carol', 'hello')
  })

  it('非対称マッチャーで検証', () => {
    const log = vi.fn()

    log({ level: 'info', message: 'start', at: Date.now() })
    log({ level: 'error', message: 'failed', at: Date.now() })

    console.log(log.mock.calls)
    // [
    //   [ { level: 'info', message: 'start', at: 1790273073369 } ],
    //   [ { level: 'error', message: 'failed', at: 1790273073369 } ]
    // ]

    expect(log).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ level: 'info', message: 'start', at: expect.any(Number) })
    )
    expect(log).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ level: 'error', message: 'failed', at: expect.any(Number) })
    )
  })
})
