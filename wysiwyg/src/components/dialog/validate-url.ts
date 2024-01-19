export function validateFullUrl (url: string): boolean {
  if (typeof url !== 'string' || url.length === 0) {
    return false
  }
  try {
    const urlConstructed = new URL(url)

    return urlConstructed.protocol === 'http:' || urlConstructed.protocol === 'https:'
  } catch {
    return false
  }
}

const fakeBaseUrl = 'https://www.base-domain-example.com'
export function validateRelativeUrl (url: string): boolean {
  if (typeof url !== 'string' || !url.startsWith('/')) {
    return false
  }
  try {
    const urlConstructed = new URL(url, fakeBaseUrl)
    if (urlConstructed.origin !== fakeBaseUrl) { // this check prevents urls like '//lmvr.app.lmpm.dev/properties/' from passing
      return false
    }
  } catch {
    return false
  }
  return true
}
