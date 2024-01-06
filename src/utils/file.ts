import formidable, { File } from 'formidable'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import { Request } from 'express'
import fs from 'fs'
import path from 'path'

export const handleUploadImage = async (req: Request) => {
  const form = formidable({
    uploadDir: UPLOAD_IMAGE_DIR,
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024,
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'image' && Boolean(mimetype?.includes('image'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err)
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.image)) {
        return reject(new Error('File is not found'))
      }
      resolve(files.image as File[])
    })
  })
}

export const handlerUploadVideo = async (req: Request, id_movie: string, id_episode: string) => {
  const dir = path.resolve(UPLOAD_VIDEO_DIR + '/', id_movie)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  const form = formidable({
    uploadDir: dir,
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 400 * 1024 * 1024,
    filename: function (filename) {
      return id_episode
    },
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'video' && Boolean(mimetype?.includes('video'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err)
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.video)) {
        return reject(new Error('File is not found'))
      }
      const video = files.video as File[]
      const ext = getExtensionFromFullName(video[0].originalFilename as string)
      fs.renameSync(video[0].filepath, video[0].filepath + '.' + ext)
      video[0].filepath = video[0].filepath + '.' + ext
      resolve(files.video as File[])
    })
  })
}

export const initFolder = () => {
  ;[UPLOAD_IMAGE_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
      console.log('Init folder successfully')
    }
  })
}

export const getExtensionFromFullName = (filename: string) => {
  const namearr = filename.split('.')
  return namearr[namearr.length - 1]
}
