import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

export const connect = async () => {
  mongoose.set('strictQuery', true);
  const db = await mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to db!');
    });

  return db;
};
