import Movie from '~/models/schemas/Movie.schemas'
import databaseService from './database.services'

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
            $project: {
              url: 0,
              id_img: 0
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
            $project: {
              url: 0,
              id_img: 0
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray()
    ])
    console.log(total[0].total)
    return {
      message: 'Get movie successfully',
      data: result,
      page: page,
      limit: limit,
      total: Math.ceil(total[0].total / limit)
    }
  }
}
const movieService = new MovieService()

export default movieService
