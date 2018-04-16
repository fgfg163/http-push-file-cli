import path from 'path'
import fs from 'fs'
import chokidar from 'chokidar'
import axios from 'axios'
import FormData from 'formdata'

const watchOptions = {
  ignore: ['.git', '.idea', 'node_modules']
}


const watcher = chokidar.watch('./', {
  ignored: watchOptions.ignore
})

const pushToServer = (filePath) => {
  const formdata = new FormData()
  formdata.append('file')
  formdata.append('to', path.join('/home/map/', filePath))

  axios({
    method: 'post',
    url: 'http://gzhxy-waimai-dcloud48.gzhxy.iwm.name:8275/receiver.php',
    data: {
      to: 'Fred',
      lastName: 'Flintstone'
    }
  }).then(function (response) {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  });
}

watcher.on('add', (path) => {
  pushToServer
}).on('change', (path) => {

}).on('unlink', (path) => {
})

