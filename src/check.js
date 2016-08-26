import env from './env'

export default (word) =>
  new Promise((resolve, reject) => {
    const onError = () => { reject() }

    GM_xmlhttpRequest({
      url: `http://localhost:${env.port}/check/${word}`,
      method: 'GET',
      onabort: onError,
      onerror: onError,
      onload: ({ response }) => {
        const { present } = JSON.parse(response)
        resolve(present)
      }
    })
  })
