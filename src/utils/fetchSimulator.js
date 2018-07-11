/* global localStorage */

export const apiCall = {
  get: type => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(JSON.parse(localStorage.getItem(type))), 2000)
    })
  },
  set: bodyObject => {
    const { type, data } = bodyObject
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(localStorage.setItem(type, JSON.stringify([data, ...localStorage.getItem(type)]))), 2000)
    })
  }
}
