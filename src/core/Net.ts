import { net } from 'electron'

class Net {

  async fetch (url: string) {
    const response = await net.fetch(url)
    if (response.ok) {
      const body = await response.json()
      return body
    }
  }
  
}

export default Net