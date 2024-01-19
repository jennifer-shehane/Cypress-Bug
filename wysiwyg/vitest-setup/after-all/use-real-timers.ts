import { afterAll } from 'vitest'

afterAll(() => {
  globalThis.vi.useRealTimers()
})
