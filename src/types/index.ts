export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string // 请求地址
  method?: Method // HTTP请求方法
  data?: any // post、patch、等类型请求的数据
  params?: any // get、head、等类型请求的数据
  headers?: any // 请求headers
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  [propName: string]: any
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

export interface Interceptors {
  request: AxiosInterceptorManager<AxiosRequestConfig>
  response: AxiosInterceptorManager<AxiosResponse>
}

export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel(val: any): boolean
}

/** 拦截器管理对象对外的接口 */

export interface AxiosInterceptorManager<T> {
  use(resolve: ResolvedFn<T>, reject?: RejectedFn): number

  eject(id: number): void
}

/** resolve函数数据类型接口 */
export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}

/** reject函数数据类型接口 */
export interface RejectedFn {
  (error: any): any
}

/** CancelToken类的实例类型接口定义 */
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
}

/** cancel取消函数的接口定义 */
export interface Canceler {
  (message?: string): void
}

/** CancelToken类的构造函数的参数的接口定义 */
export interface CancelExecutor {
  (cancel: Canceler): void
}

/** CancelToken类的静态方法的返回值类型接口  */
export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

/** CancelToken类的类类型接口 */
export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

/** Cancel类实例类型的接口定义 */
export interface Cancel {
  message?: string
}

/** Cancel类的类类型接口定义 */
export interface CancelStatic {
  new (message?: string): Cancel
}
