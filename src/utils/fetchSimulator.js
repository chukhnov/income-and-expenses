/* global localStorage */

export const apiCall = {
  get: type => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(localStorage.getItem(type)), 2000)
    })
  },
  set: bodyObject => {
    const { type, data } = bodyObject
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(localStorage.setItem(type, [data, ...localStorage.getItem(type)])), 2000)
    })
  }
}
