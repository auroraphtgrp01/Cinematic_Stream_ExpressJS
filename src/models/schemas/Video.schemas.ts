import { ObjectId } from 'mongodb'
import { VideoUploadType } from '~/constants/enums'

export interface VideoType {
  _id?: ObjectId
  path: string
  id_epdoises: ObjectId
  type: VideoUploadType
  created_at?: Date
  updated_at?: Date
}

export default class Video {
  _id?: ObjectId
  path: string
  id_epdoises: ObjectId
  type: VideoUploadType
  created_at?: Date
  updated_at?: Date
  constructor(video: VideoType) {
    this._id = video._id
    this.path = video.path
    this.id_epdoises = video.id_epdoises
    this.type = video.type
    this.created_at = video.created_at || new Date()
    this.updated_at = video.updated_at || new Date()
  }
}
