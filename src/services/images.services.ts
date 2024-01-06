import Image from '~/models/schemas/Image.schemas'
import databaseService from './database.services'
import { Request } from 'express'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import { handleUploadImage } from '~/utils/file'
import { log } from 'console'
import path from 'path'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
class ImageService {
  async uploadImage(image_file_name: string) {
    try {
      const filePath = `/static/image/${image_file_name}`
      const image = await databaseService.images.insertOne(
        new Image({
          file_name: image_file_name,
          path: filePath
        })
      )
      return image.insertedId
    } catch (error) {
      throw new ErrorWithStatus({
        message: 'Upload image failed',
        status: HTTP_STATUS.NOT_FOUND
      })
    }
  }
}

const imageService = new ImageService()

export default imageService
