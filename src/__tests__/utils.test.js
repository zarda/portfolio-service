import { getScreenshotUrl } from '../utils'

describe('getScreenshotUrl', () => {
  it('builds the thum.io screenshot endpoint for a given url', () => {
    const url = 'https://example.com'
    expect(getScreenshotUrl(url)).toBe('https://image.thum.io/get/width/600/crop/400/https://example.com')
  })
})


