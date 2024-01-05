import Image from '~/models/schemas/Image.schemas'
import databaseService from './database.services'

class ImageService {
  async uploadImage(url: string) {
    const result = await databaseService.images.insertOne(
      new Image({
        url: url
      })
    )
    return result.insertedId
  }
}

const imageService = new ImageService()

export default imageService
