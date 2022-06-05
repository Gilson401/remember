/** @format */

import qs from 'qs'

export default function ({ $axios }, inject) {
  const baseURL = 'http://192.168.0.107:3010/'
  //   const baseURL = 'http://localhost:3010/'

  const api = $axios.create({
    baseURL,
    timeout: 60000, // 1 minuto
    withCredentials: false,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'indices', allowSparse: true }),
    headers: {
      common: {
        Accept: 'application/json',
      },
    },
  })

  api.onError((err) => {
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const code = parseInt(err.response.status)

      throw new Error(`Houve um erro ${code}`)
    } else if (err.request) {
      // The request was made but no response was received
      // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      if (process.client)
        alert(
          `Serviço temporariamente indisponível.\nTente novamente mais tarde. ${JSON.stringify(
            err
          )}`
        )
    } else {
      // Something happened in setting up the request that triggered an Error
      // //   if (process.server) console.log(err.message)
      // if (process.client)
      //     alert('Ocorreu um erro. Por favor, entre em contato com o suporte.')
    }
  })

  inject('api', api)
}
