import path from 'path'
import fs from 'fs'
import chokidar from 'chokidar'
import superagent from 'superagent'
import FormData from 'formdata'
import fsp from './fs-promise'

const watchOptions = {
  ignore: ['.git', '.idea', 'node_modules']
}

const ignoreRegExp = watchOptions.ignore.map(e => new RegExp(e))

const watcher = chokidar.watch(fs.realpathSync('./'), {
  ignored: (filePath, stat) => (
    ignoreRegExp.some(p => p.test(filePath))
  )
})

const pushToServer = async (filePath) => {
  try {
    await fsp.access(filePath)
  } catch (err) {
    return
  }

  return superagent.post('http://gzhxy-waimai-dcloud48.gzhxy.iwm.name:8275/receiver.php')
    .field('to', path.posix.join('/home/map/', filePath))
    .attach('file', filePath)
    .then((res) => {
      console.log(res.text)
      console.log(filePath)
    })
}

watcher.on('add', (path) => {
  pushToServer(path)
}).on('change', (path) => {
  pushToServer(path)
}).on('unlink', (path) => {
}).on('all', (event, path) => {
  console.log(event, path);
})

console.log('start')
