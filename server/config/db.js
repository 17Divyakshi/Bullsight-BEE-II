import mongoose from 'mongoose';

/**
 * Connects to MongoDB using Mongoose.
 * Implements connection event listeners and graceful termination.
 */
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bullsight_db';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}, database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB Connection Error] ${error.message}`);
    console.warn(`[MongoDB Warning] Running with limited offline persistence if MongoDB is not reachable.`);
    // Do not crash the process; allow server to boot and report health
  }
};

mongoose.connection.on('connected', () => {
  console.log('[Mongoose Event] Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`[Mongoose Event] Error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('[Mongoose Event] Disconnected from MongoDB');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('[Mongoose Event] Connection closed due to application termination (SIGINT)');
  process.exit(0);
});
