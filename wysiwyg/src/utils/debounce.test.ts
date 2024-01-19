import { debounceRequestAnimationFrame } from './debounce'

describe('debounceRequestAnimationFrame', () => {
  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
  })

  it('should debounce the callback function', () => {
    const callback = vi.fn()
    const debouncedCallback = debounceRequestAnimationFrame(callback)

    debouncedCallback()
    expect(callback).not.toHaveBeenCalled()

    vi.runOnlyPendingTimers()
    expect(callback).toHaveBeenCalledTimes(1)

    debouncedCallback()
    expect(callback).toHaveBeenCalledTimes(1)

    vi.runOnlyPendingTimers()
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('should pass arguments to the callback function', () => {
    const callback = vi.fn()
    const debouncedCallback = debounceRequestAnimationFrame(callback)

    debouncedCallback('foo', 42)
    vi.runOnlyPendingTimers()

    expect(callback).toHaveBeenCalledWith('foo', 42)
  })
})