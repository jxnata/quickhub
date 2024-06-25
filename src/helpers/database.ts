import mongoose, { Connection, Mongoose } from 'mongoose';

const uri: string = process.env.MONGODB_URI || '';

if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached: { conn: Mongoose | null; promise: Promise<Mongoose> | null } = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connect(): Promise<Mongoose> {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(uri).then((mongoose) => {
            return mongoose;
        });
    }

    cached.conn = await cached.promise;

    return cached.conn;
}