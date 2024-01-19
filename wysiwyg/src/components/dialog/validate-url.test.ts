import {
  validateRelativeUrl, validateFullUrl 
} from './validate-url'

// TODO: Vitest "test.each" doesn't catch test failures. Only the first sample failure is reported.
// TODO: tests are failed running in an emulated DOM environment, but in the real DOM validation behaves differently.

describe('validateRelativeUrl', () => {
  it('should return true for a valid relative URL', () => {
    const urls = [
      '/path/to/page',
      '/guests/c60aee79-4e9a-4c8c-905a-99b67721ea97',
      '/properties/53ed15fae9c96',
      '/properties/53ed15fae9c96/edit',
      '/properties/144fb910-1a90-11e5-b5fb-31342daf84a3',
      '/trips?nfu=true',
      '/inbox/06bd81e9-9212-48a4-b5b0-9d533906b713',
      '/accounts/owner-statements',
      '/trips/new'
    ]
    for (const url of urls) {
      expect(validateRelativeUrl(url)).toBe(true)
    }
  })
  
  it('should return false for a relative URL that does not start with backslash', (url: string) => {
    const urls = [
      'accounts/owner-statements',
      'path/to/page',
      'guests/c60aee79-4e9a-4c8c-905a-99b67721ea97'
    ]
    for (const url of urls) {
      expect(validateRelativeUrl(url)).toBe(false)
    }
  })

  it('should return false for an invalid relative URL', () => {
    const urls = [
      'http://example.com',
      'https://google.com',
      'ftp://example.com',
      'https:///inbox/4e2470e9-9f66-4694-8df4-96b5ca91d790',
      'example.com',
      'https://lmvr.app.lmpm.dev/properties/53ed15fae9c96/edit',
      '//lmvr.app.lmpm.dev/properties/53ed15fae9c96/edit?nfu=true'
    ]

    for (const url of urls) {
      expect(validateRelativeUrl(url)).toBe(false)
    }
  })

  it('should return false for non-string values', () => {
    const urls = [
      null,
      undefined,
      {},
      [],
      0,
      1,
      true,
      false,
      NaN
    ]

    for (const url of urls) {
      expect(validateRelativeUrl(url as any)).toBe(false)
    }
  })
})

describe('validateFullUrl', () => {
  // TODO: Vitest "test.each" doesn't catch test failures. Only the first sample failure is reported.

  it('should return true for a valid full URL', () => {
    const urls = [
      'http://example.com',
      'https://google.com',
      'https://example.com',
      'https://lmvr.app.lmpm.dev/properties/53ed15fae9c96/edit',
      'https://lmvr.app.lmpm.com/trips/074bba45-9757-408f-af47-9065f46d3daa',
      'https://lmpm.com/'
    ]

    for (const url of urls) {
      expect(validateFullUrl(url)).toBe(true)
    }
  })

  it('should return false for a valid ftp', () => {
    const urls = [
      'ftp://example.com/',
      'ftp://example.com',
      'ftp://example.com/path/to/file.txt',
      'ftp://example.com/path/to/file.txt?query=string'
    ]

    for (const url of urls) {
      expect(validateFullUrl(url)).toBe(false)
    }
  })

  it('should return false for an invalid full URL', () => {
    const urls = [
      'a',
      '1',
      'example.com',
      'www.example.com',
      'example.com/path/to/file.txt',
      '/example.com/path/to/file.txt',
      '//lmvr.app.lmpm.dev/properties/53ed15fae9c96/edit?nfu=true',
      'https:///inbox/4e2470e9-9f66-4694-8df4-96b5ca91d790'
    ]

    for (const url of urls) {
      try {
        expect(validateFullUrl(url as any)).toBe(false)
      } catch (err) {
        debugger
        console.log('err', url)
      }
    }
  })

  it('should return false for non-string values', () => {
    const urls = [
      null,
      undefined,
      {},
      [],
      0,
      1,
      true,
      false,
      NaN
    ]

    for (const url of urls) {
      expect(validateFullUrl(url as any)).toBe(false)
    }
  })
})