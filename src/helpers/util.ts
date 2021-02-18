const objPtoToString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return objPtoToString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  return objPtoToString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          // 第二次遍历时发现仍让是一个普通的object，而且存在result中那么就是合并这俩个对象
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            // 第一次就是深拷贝这个对象，并赋值
            result[key] = deepMerge({}, val)
          }
        } else {
          // 第一就是普通赋值，第二次这个属性如果不存在就赋值存在覆盖
          result[key] = val
        }
      })
    }
  })

  return result
}

export function isFormData(val: any): boolean {
  return val !== 'undefined' && val instanceof FormData
}

export function isURLSearchParams(val: any): val is URLSearchParams {
  return val !== 'undefined' && val instanceof URLSearchParams
}
