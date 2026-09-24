import { describe, it, expect, vi } from 'vitest'

describe('toHaveBeenLastCalledWith', () => {
  it('最後の呼び出しの引数を検証する', () => {
    const fn = vi.fn()

    fn('a', 1)
    fn('b', 2)

    console.log(fn.mock.calls)  // [ [ 'a', 1 ], [ 'b', 2 ] ]
    console.log(fn.mock.lastCall)  // [ 'b', 2 ]
    expect(fn).toHaveBeenLastCalledWith('b', 2)
    expect(fn).not.toHaveBeenLastCalledWith('a', 1)
  })

  it('非対称マッチャーで検証', () => {
    const onSave = vi.fn()

    onSave({ id: 1, name: 'A', updateAt: new Date() })

    console.log(onSave.mock.lastCall)  // [ { id: 1, name: 'A', updateAt: 2026-09-23T18:33:06.556Z } ]
    expect(onSave).toHaveBeenLastCalledWith(
      expect.objectContaining({ id: 1, name: 'A' })
    )
  })

  it('vi.spyOn で作成したモック関数を検証', () => {
    const logger = { info: (message) => {} }
    const spy = vi.spyOn(logger, 'info')

    logger.info('first')
    logger.info('second')

    console.log(spy.mock.calls)  // [ [ 'first' ], [ 'second' ] ]
    expect(spy).toHaveBeenLastCalledWith('second')
  })
})
