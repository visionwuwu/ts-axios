import axios, { Canceler } from '../../src/index'

let CancelToken = axios.CancelToken
let source = CancelToken.source()

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.error('Request canceled', e.message)
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  axios.post('/cancel/post', { a: 1 }, {
    cancelToken: source.token
  }).catch(e => {
    if (axios.isCancel(e)) {
      console.error(e.message);
    }
  })
}, 100);


let cancel: Canceler

axios.get('/cancel/get', {
  cancelToken: new axios.CancelToken(c => {
    cancel = c
  })
}).catch(e => {
  if (axios.isCancel(e)) {
    console.log('Request canceled');
  }
})

setTimeout(() => {
  cancel()
}, 200)