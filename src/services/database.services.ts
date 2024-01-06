import { Collection, Db, MongoClient } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/User.schemas'
import RefreshToken from '~/models/schemas/RefreshToken.schemas'
import Country from '~/models/schemas/Country.schemas'
import Director from '~/models/schemas/Director.schemas'
import Language from '~/models/schemas/Language.schemas'
import Movie from '~/models/schemas/Movie.schemas'
import Image from '~/models/schemas/Image.schemas'
import Episodes from '~/models/schemas/Episodes.schemas'
config()
console.log('DB_USERNAME', process.env.DB_USERNAME)
console.log('DB_PASSWORD', process.env.DB_PASSWORD)

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cinematic.2addvii.mongodb.net/?retryWrites=true&w=majority`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Connected successfully to MongoDB server')
    } catch (error) {
      console.log('Could not connect to MongoDB server: ', error)
      throw error
    }
  }
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USER_COLLECTION as string)
  }
  get refresh_tokens(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESH_TOKEN_COLLECTION as string)
  }
  get countries(): Collection<Country> {
    return this.db.collection(process.env.DB_COUNTRY_COLLECTION as string)
  }
  get directors(): Collection<Director> {
    return this.db.collection(process.env.DB_DIRECTOR_COLLECTION as string)
  }
  get languages(): Collection<Language> {
    return this.db.collection(process.env.DB_LANGUAGE_COLLECTION as string)
  }
  get movies(): Collection<Movie> {
    return this.db.collection(process.env.DB_MOVIE_COLLECTION as string)
  }
  get images(): Collection<Image> {
    return this.db.collection(process.env.DB_IMAGE_COLLECTION as string)
  }
  get episodes(): Collection<Episodes> {
    return this.db.collection(process.env.DB_EPISODES_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()

export default databaseService
