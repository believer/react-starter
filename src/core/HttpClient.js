import request from 'superagent';

export function get (url) {
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .accept('application/json')
      .end((err, res) => {
        if (err) {
          if (err.status === 404) {
            resolve(null)
          } else {
            reject(err)
          }
        } else {
          resolve(res.body)
        }
      })
  })
}

export function post (url) {
  return new Promise((resolve, reject) => {
    request
      .post(url)
      .end((err, res) => {
        if (err) {
          if (err.status === 404) {
            resolve(null)
          } else {
            reject(err)
          }
        } else {
          resolve(res.body)
        }
      })
  })
}

export default {
  get: get,
  post: post
}
