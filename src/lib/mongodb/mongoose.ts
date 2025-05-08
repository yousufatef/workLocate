import mongoose from 'mongoose'

const init = false

export const connect = async () => {
    mongoose.set('strictQuery', true)
    if (init) {
        console.log('MongoDB already initialized')
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: "worklocate",
            autoIndex: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4,
        })
        console.log('MongoDB connected')
    } catch (error) {
        console.error('MongoDB connection error:', error)
    }
}