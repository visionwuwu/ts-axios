import axios from '../../src'

axios({
  url: '/base/get',
  method: 'get',
  params: {
    foo: ['bar', 'baz']
  }
})

axios({
  url: '/base/get',
  method: 'get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

axios({
  url: '/base/get',
  method: 'get',
  params: {
    date: new Date()
  }
})

axios({
  url: '/base/get',
  method: 'get',
  params: {
    foo: '@:$, '
  }
})

axios({
  url: '/base/get',
  method: 'get',
  params: {
    foo: 'bar',
    baz: null
  }
})

axios({
  url: '/base/get#hash',
  method: 'get',
  params: {
    foo: 'bar'
  }
})

axios({
  url: '/base/get?foo=bar',
  method: 'get',
  params: {
    bar: 'baz'
  }
})


axios({
  url: '/base/post',
  method: 'post',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res)
})


const arr = new Int32Array([21, 22])

axios({
  url: '/base/buffer',
  method: 'post',
  data: arr
}).then(res => {
  console.log(res)
})