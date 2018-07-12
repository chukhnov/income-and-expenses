/* global localStorage */

export const apiCall = {
  get: type => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(JSON.parse(localStorage.getItem(type))), 1000)
    })
  },
  set: bodyObject => {
    const { type, data } = bodyObject
    return new Promise((resolve, reject) => {
      localStorage.setItem(type, JSON.stringify([data, ...JSON.parse(localStorage.getItem(type)) || []]))
      setTimeout(() => resolve(JSON.parse(localStorage.getItem(type))), 1000)
    })
  },
  delete: bodyObject => {
    const { type, itemId } = bodyObject
    return new Promise((resolve, reject) => {
      localStorage.setItem(type, JSON.stringify([...JSON.parse(localStorage.getItem(type)).filter(el => el._id !== itemId) || []]))
      setTimeout(() => resolve(JSON.parse(localStorage.getItem(type))), 1000)
    })
  },
  edit: bodyObject => {
    const { type, data } = bodyObject
    return new Promise((resolve, reject) => {
      localStorage.setItem(type, JSON.stringify([...JSON.parse(localStorage.getItem(type)).filter(el => el._id !== data._id) || [], data]))
      setTimeout(() => resolve(JSON.parse(localStorage.getItem(type))), 1000)
    })
  }
}
