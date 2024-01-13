import formidable, { File } from 'formidable'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import { Request } from 'express'
import fs from 'fs'
import path from 'path'
import fsPromise from 'fs/promises'
import { encodeHLSWithMultipleVideoStreams } from './video'
import databaseService from '~/services/database.services'
import { VideoStatus } from '~/models/schemas/VideoStatus.schemas'
import { EncodingStatus } from '~/constants/enums'
import Queue from '~/models/schemas/Queue.schemas'
import { ObjectId } from 'mongodb'

class QueueDB {
  item: string[]
  encoding: boolean
  constructor() {
    this.item = []
    this.encoding = false
  }
  async enqueue(item: string) {
    this.item.push(item)
    const nameID = getNameFromFullName(item.split('/').pop() as string)
    await databaseService.video_status.insertOne(
      new VideoStatus({
        name: nameID,
        status: EncodingStatus.Pending
      })
    )
    await databaseService.queue.insertOne(
      new Queue({
        _id: new ObjectId(),
        name: nameID
      })
    )
    this.processEndcode()
  }
  async processEndcode() {
    if (this.encoding) return
    if (this.item.length > 0) {
      this.encoding = true
      const videoPath = this.item[0]
      const nameID = getNameFromFullName(videoPath.split('/').pop() as string)
      await databaseService.video_status.updateOne(
        {
          name: nameID
        },
        {
          $set: {
            status: EncodingStatus.Processing
          },
          $currentDate: {
            updated_at: true
          }
        }
      )
      try {
        await encodeHLSWithMultipleVideoStreams(videoPath)
        this.item.shift()
        await databaseService.queue.deleteOne({
          name: nameID
        })
        await databaseService.video_status.updateOne(
          {
            name: nameID
          },
          {
            $set: {
              status: EncodingStatus.Success
            },
            $currentDate: {
              updated_at: true
            }
          }
        )
        await fsPromise.unlink(videoPath)
        this.encoding = false
      } catch (error) {
        await databaseService.video_status.updateOne(
          {
            name: nameID
          },
          {
            $set: {
              status: EncodingStatus.Failed,
              message: error as string
            },
            $currentDate: {
              updated_at: true
            }
          }
        )
      }
      this.encoding = false
      this.processEndcode()
    }
  }
}

const queue = new QueueDB()

export const getNameFromFullName = (filename: string) => {
  const namearr = filename.split('.')
  namearr.pop()
  return namearr.join('')
}

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
  const dir = path.resolve(UPLOAD_VIDEO_DIR + '/', id_movie + '/', id_episode)
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

export const handleUploadHLS = async (req: Request, id_movie: string, id_episode: string) => {
  const files = await handlerUploadVideo(req, id_movie, id_episode)
  files.map(async (file) => {
    queue.enqueue(file.filepath)
  })
}
