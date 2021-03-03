import mongoose from 'mongoose';

function initDB() {
  const DB_URI = 'mongodb://localhost:27017/test_mongodb';

  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.once('open', () => {
    console.error(`Mongoose connection open to ${DB_URI}`);
  });

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.error('Mongoose connection disconnected');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.warn('Mongoose connection disconnected through app termination');
      process.exit(0);
    });
  });
}

export default initDB;