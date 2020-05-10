import rp from 'request-promise'

export function Request<T>(url: string): Promise<T> {
  return new Promise((resolve) => {
    rp({
      uri: encodeURI(url),
      resolveWithFullResponse: true,
      json: true,
    })
      .then((res) => {
        resolve(res.body)
      })
      .catch((e) => {
        if (e instanceof Promise) {
          throw e
        }
      })
  })

}
