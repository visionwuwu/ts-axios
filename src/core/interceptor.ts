import { ResolvedFn, RejectedFn } from '../types'

// 拦截器对象
interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

/** 实现拦截器管理类 */
export default class InterceptorManager<T> {
  // 拦截器对象的数组
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  /** 添加拦截器的方法 */
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  /** 遍历拦截器的方法 */
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  /** 删除拦截器的方法 */
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
