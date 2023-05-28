import mongoose from 'mongoose'
import { MONGO_URI } from './config'
import logger from './logger'

export default {
  mongoose,
  connect: async (): Promise<void> => {
    try {
      mongoose.set('strictQuery', true)
      const conn = await mongoose.connect(MONGO_URI)
      if (process.env.NODE_ENV !== 'test') {
        logger.success(`MONGO DB CONNECTED: ${conn.connection.host}`)
      }
    } catch (error) {
      logger.error(`Error: ${(error as Error).message}`)
      process.exit()
    }
  },
  disconnect: async () => {
    await mongoose.disconnect()
  },
}
