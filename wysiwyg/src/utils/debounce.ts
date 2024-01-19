/**
 * This function debounces a callback function with "requestAnimationFrame" API instead of 
 * "setTimeout" API. 
 * This is useful for example to debounce the "transaction" event of the TipTap editor, because
 * the "transaction" event is called multiple times in a short time.
 * 
 * @param callback - the function to debounce
 * @returns - the debounced "callback" function
 */
export const debounceRequestAnimationFrame = <T extends (...args: any[]) => any>(callback: T): (...args: Parameters<T>) => void => {
  let requestId: ReturnType<typeof requestAnimationFrame> | undefined
  return (...args: Parameters<T>): void => {
    if (typeof requestId === 'number') {
      globalThis.cancelAnimationFrame(requestId)
    }
    requestId = globalThis.requestAnimationFrame(() => {
      callback(...args)
    })
  }
}
