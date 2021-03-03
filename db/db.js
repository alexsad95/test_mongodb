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

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      process.exit(0);
    });
  });
}

export default initDB;