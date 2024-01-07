import Movie from '~/models/schemas/Movie.schemas'
import databaseService from './database.services'
import Director from '~/models/schemas/Director.schemas'
import Country from '~/models/schemas/Country.schemas'
import Language from '~/models/schemas/Language.schemas'
import Episodes from '~/models/schemas/Episodes.schemas'
import { ObjectId } from 'mongodb'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import Type from '~/models/schemas/Type.schemas'

class MovieService {
  async createMovie(movie: Movie) {
    await databaseService.movies.insertOne(movie)
    return {
      message: 'Create movie successfully'
    }
  }
  async getMovie(limit: number = 0, page: number = 0) {
    const [result, total] = await Promise.all([
      databaseService.movies
        .aggregate([
          {
            $match: {}
          },
          {
            $lookup: {
              from: 'images',
              localField: 'id_img',
              foreignField: '_id',
              as: 'url'
            }
          },
          {
            $unwind: {
              path: '$url'
            }
          },
          {
            $addFields: {
              imgUrl: '$url.url'
            }
          },
          {
            $lookup: {
              from: 'directors',
              localField: 'id_director',
              foreignField: '_id',
              as: 'directors'
            }
          },
          {
            $unwind: {
              path: '$directors'
            }
          },
          {
            $addFields: {
              director: '$directors.name'
            }
          },
          {
            $lookup: {
              from: 'languages',
              localField: 'id_language_original',
              foreignField: '_id',
              as: 'language_original'
            }
          },
          {
            $unwind: {
              path: '$language_original'
            }
          },
          {
            $addFields: {
              language_original: '$language_original.name'
            }
          },
          {
            $lookup: {
              from: 'countries',
              localField: 'id_contries',
              foreignField: '_id',
              as: 'countries'
            }
          },
          {
            $unwind: {
              path: '$countries'
            }
          },
          {
            $addFields: {
              countries: '$countries.name'
            }
          },
          {
            $lookup: {
              from: 'images',
              localField: 'id_img',
              foreignField: '_id',
              as: 'image'
            }
          },
          {
            $unwind: {
              path: '$image'
            }
          },
          {
            $addFields: {
              image: '$image.path'
            }
          },
          {
            $lookup: {
              from: 'types',
              localField: 'id_type',
              foreignField: '_id',
              as: 'types'
            }
          },
          {
            $addFields: {
              types: {
                $map: {
                  input: '$types',
                  as: 'type',
                  in: '$$type.name'
                }
              }
            }
          },
          {
            $project: {
              url: 0,
              id_img: 0,
              id_director: 0,
              directors: 0,
              id_contries: 0,
              id_language_original: 0,
              id_type: 0
            }
          },
          {
            $skip: limit * (page - 1)
          },
          {
            $limit: limit
          }
        ])
        .toArray(),
      databaseService.movies
        .aggregate([
          {
            $match: {}
          },
          {
            $count: 'total'
          }
        ])
        .toArray()
    ])
    result.map((item: any) => {
      item.image = `${process.env.DOMAIN}${item.image}`
    })
    return {
      message: 'Get movie successfully',
      data: result,
      page: page,
      limit: limit,
      total: Math.ceil(total[0]?.total / limit)
    }
  }
  async createDirector(name: string) {
    await databaseService.directors.insertOne(new Director({ name: name }))
    return {
      message: 'Create director successfully'
    }
  }
  async getDirector() {
    const result = await databaseService.directors.find({}).toArray()
    return {
      message: 'Get director successfully',
      data: result
    }
  }
  async createContries(name: string) {
    await databaseService.countries.insertOne(new Country({ name: name }))
    return {
      message: 'Create contries successfully'
    }
  }
  async getContries() {
    const result = await databaseService.countries.find({}).toArray()
    return {
      message: 'Get contries successfully',
      data: result
    }
  }
  async createLanguage(name: string) {
    await databaseService.languages.insertOne(new Language({ name: name }))
    return {
      message: 'Create language successfully'
    }
  }
  async getLanguage() {
    const result = await databaseService.languages.find({}).toArray()
    return {
      message: 'Get language successfully',
      data: result
    }
  }
  async createEpisode(episodes: Episodes) {
    const result = await databaseService.episodes.insertOne(episodes)
    return result.insertedId
  }
  async getEpisodes(id_movie: string) {
    const result = await databaseService.episodes
      .aggregate([
        {
          $match: {
            id_movie: new ObjectId(id_movie)
          }
        }
      ])
      .toArray()
    if (result.length === 0) {
      throw new ErrorWithStatus({
        message: 'Episode not found!',
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    result.map((item: any) => {
      item.path = `${process.env.DOMAIN}/static/video/${id_movie}/${item._id}.mp4`
    })
    return result
  }
  async createTypeMovie(type: Type) {
    await databaseService.types.insertOne(type)
    return {
      message: 'Create type successfully'
    }
  }
}
const movieService = new MovieService()

export default movieService
