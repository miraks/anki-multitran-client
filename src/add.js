import env from './env'

export default (data) =>
  new Promise((resolve, reject) => {
    const onError = () => { reject() }

    GM_xmlhttpRequest({
      url: `http://localhost:${env.port}/add`,
      method: 'POST',
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      onabort: onError,
      onerror: onError,
      onload: ({ response }) => {
        const { success } = JSON.parse(response)
        if (!success) return reject()
        resolve()
      }
    })
  })
