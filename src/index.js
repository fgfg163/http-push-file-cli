import path from 'path'
import fs from './fs-promise'
const watchOptions = {
  ignore: ['node_modules/']
}

const getDirAndFileList = async (thePath) => {
  const fileList = []
  const dirList = []
  const runPath = async (filePath) => {
    const list = await fs.readdir(filePath)
    const resList = await Promise.all(list.map(async (fileName) => {
      const subFilePath = path.join(filePath, fileName)
      const info = await fs.stat(subFilePath)
      if (info.isDirectory()) {
        dirList.push(subFilePath)
        await runPath(subFilePath);
      } else {
        fileList.push(subFilePath)
      }
    }))
  }
  await runPath(thePath)
  return [fileList, dirList]
}


(async () => {
  const [fileList, dirList] = await getDirAndFileList('./')
  console.log(fileList)
  console.log(dirList)
})().catch((err) => {
  console.error(err)
})
