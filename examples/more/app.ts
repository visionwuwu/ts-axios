import axios from '../../src/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// document.cookie = 'a=b'

// axios.get('/more/get', {
//   withCredentials: false
// }).then(res => {
//   console.log(res);
// })

// axios.post('http://localhost:8088/more/server2', {}, {
//   withCredentials: true
// }).then(res => {
//   console.log(res);
// })

// const instance = axios.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D'
// })

// instance.get('/more/get').then(res => {
//   console.log(res);
// })

const instance2 = axios.create()

function calculatePercentage(loaded: number, total: number): number {
  return Math.floor(loaded * 1.0) / total
}

function loadProgressBar() {
  function setupStartProgress() {
    instance2.interceptors.request.use(config => {
      NProgress.start()
      return config
    })  
  }

  function setupUpdateProgress() {
    const update = (e: ProgressEvent) => {
      NProgress.set(calculatePercentage(e.loaded, e.total))
    }
    instance2.defaults.onDownloadProgress = update
    instance2.defaults.onUploadProgress = update
  }

  function setupStopProgress() {
    instance2.interceptors.response.use(response => {
      NProgress.done()
      return response
    }, error => {
      NProgress.done()
      return Promise.reject(error)
    })
  }

  setupStartProgress()
  setupUpdateProgress()
  setupStopProgress()
}

loadProgressBar()

const downloadEl = document.getElementById('download')

downloadEl.addEventListener('click', (e) => {
  instance2.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
})

const uploadEl = document.getElementById('upload')
uploadEl.addEventListener('click', (e) => {
  const data = new FormData()
  const fileEl = document.getElementById('file') as HTMLInputElement
  if (fileEl.files) {
    data.append('file', fileEl.files[0])
    instance2.post('/more/upload', data)
  }
})