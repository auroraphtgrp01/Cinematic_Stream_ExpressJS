import { NextFunction, Response, Request } from "express"
import path from "path"
import { UPLOAD_IMAGE_DIR } from "~/constants/dir"
import imageService from "~/services/images.services"
import { handleUploadImage } from "~/utils/file"

export const uploadController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await handleUploadImage(req)
  return res.json({
    message: 'Upload image successfully',
    result: result[0]?.newFilename
  })
}

export const serveImageController = async (req: Request, res: Response, next: NextFunction) => {
  const file_name = req.params.filename
  return res.sendFile(path.resolve(UPLOAD_IMAGE_DIR + '/', file_name), (err) => {
    if (err) {
      return res.status(404).json({
        message: 'File not found'
      })
    }
  })
}
