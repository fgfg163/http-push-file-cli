import fs from 'fs'

export default {
  ...fs,
  readdir: (...param) => (
    new Promise((resolve) => {
      param[2] = (err, res) => {
        if (err) {
          throw err
        }
        resolve(res)
      }
      fs.readdir(...param)
    })
  ),
  readFile: (...param) => (
    new Promise((resolve) => {
      param[2] = (err, res) => {
        if (err) {
          throw err
        }
        resolve(res)
      }
      fs.readFile(...param)
    })
  ),
  stat: (...param) => (
    new Promise((resolve) => {
      param[1] = (err, res) => {
        if (err) {
          throw err
        }
        resolve(res)
      }
      fs.stat(...param)
    })
  ),
  access: (...param) => (
    new Promise((resolve) => {
      param[2] = (err, res) => {
        if (err) {
          throw err
        }
        resolve(res)
      }
      fs.access(...param)
    })
  ),
}
