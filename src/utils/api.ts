const succesStatusList = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226]

class Api {
  // eslint-disable-next-line class-methods-use-this, consistent-return
  private async request(url: string, method: string) {
    try {
      const response = await fetch(url, { method })

      if (!succesStatusList.includes(response.status)) throw new Error(response.statusText)

      return response
    } catch (e: unknown) {
      if (e instanceof Error) throw new Error(e.message)
    }
  }

  // eslint-disable-next-line consistent-return
  public async get(url: string) {
    const response = await this.request(url, 'GET')

    if (response) return response.json()
  }
}

export default new Api()
