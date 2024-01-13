import { NextFunction, Response, Request } from 'express'
import path from 'path'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import HTTP_STATUS from '~/constants/httpStatus'
import { handleUploadImage, handlerUploadVideo } from '~/utils/file'
import fs from 'fs'
import imageService from '~/services/images.services'

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await handleUploadImage(req)
  await imageService.uploadImage(result[0]?.newFilename)
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
export const serveVideoController = async (req: Request, res: Response, next: NextFunction) => {
  const file_name = req.params.filename
  const folder_name = req.params.foldername
  const videoPath = path.resolve(UPLOAD_VIDEO_DIR + '/', folder_name, file_name)
  console.log(videoPath)

  if (!fs.existsSync(videoPath)) {
    return res.status(HTTP_STATUS.NOT_FOUND).send('File not found')
  }

  const videoSize = fs.statSync(videoPath).size
  const contentType = 'mp4' || 'video/*'

  const headers = {
    'Content-Length': videoSize,
    'Content-Type': contentType
  }

  res.writeHead(HTTP_STATUS.OK, headers)

  const videoStream = fs.createReadStream(videoPath)
  videoStream.pipe(res)
}

export const uploadVideoController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await handlerUploadVideo(req, '111', '222')
  return res.json({
    message: 'Upload video successfully',
    result: result
  })
}

export const serveHLSController = async (req: Request, res: Response, next: NextFunction) => {
  res.header('Content-Type', 'application/vnd.apple.mpegurl');
  res.header('Cache-Control', 'no-cache');
  const { id_movie, id_episode } = req.params
  const m3u8FilePath = path.resolve(`uploads/movies/videos/${id_movie}/${id_episode}`, 'master.m3u8')
  console.log(m3u8FilePath)
  const stream = fs.createReadStream(m3u8FilePath);
  stream.pipe(res)
}

export const serveSegmentHLSController = async (req: Request, res: Response, next: NextFunction) => {
  const { v, segment, id_movie, id_episode } = req.params
  res.header('Content-Type', 'application/vnd.apple.mpegurl');
  res.header('Cache-Control', 'no-cache');
  const m3u8FilePath = path.resolve(`uploads/movies/videos/${id_movie}/${id_episode}/${v}/${segment}`)
  const stream = fs.createReadStream(m3u8FilePath)
  stream.pipe(res)
}