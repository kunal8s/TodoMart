import 'dotenv/config';
import http from 'http';
import app from './app.js';
import pool from './src/database/dbPostgresql.js';
import connectMongooseDB from './src/database/dbMongoose.js';

// Graceful shutdown handler
const gracefulShutdown = async (server, signal) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);
  
  try {
    // Close server first to stop accepting new connections
    server.close(async () => {
      console.log('HTTP server closed');
      
      // Close database connections
      try {
        await pool.end();
        console.log('PostgreSQL connection pool closed');
      } catch (dbError) {
        console.error('Error closing PostgreSQL pool:', dbError);
      }
      
      console.log('Graceful shutdown complete. Goodbye! 👋');
      process.exit(0);
    });
    
    // Force shutdown after 10 seconds if graceful shutdown fails
    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
    
  } catch (error) {
    console.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions and unhandled rejections
process.on('uncaughtException', (error) => {
  console.error('UNCAUGHT EXCEPTION 💥 Shutting down...');
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION 💥 Shutting down...');
  console.error('Promise:', promise);
  console.error('Reason:', reason);
  process.exit(1);
});

// Initialize server
(async () => {
  try {
    // Test PostgreSQL connection
    const res = await pool.query('SELECT 1');
    console.log('PostgreSQL is RUNNING ✅');
    
    // Get PostgreSQL version
    const versionResult = await pool.query('SELECT version()');
    console.log(`PostgreSQL Version: ${versionResult.rows[0].version.split(',')[0]}`);
    
    // Get database name
    const dbResult = await pool.query('SELECT current_database()');
    console.log(`Connected to database: ${dbResult.rows[0].current_database}`);
    
  } catch (err) {
    console.error('PostgreSQL is NOT running ❌', err.message);
    console.error('Please check your PostgreSQL connection and database credentials');
    process.exit(1);
  }
})();

// Connect MongoDB if you're using it
try {
  connectMongooseDB();
  console.log('MongoDB connection initialized ✅');
} catch (error) {
  console.error('MongoDB connection failed ❌', error.message);
  // Don't exit if MongoDB fails if it's optional for your app
}

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 API Base URL: http://localhost:${PORT}/api`);
});

// Graceful shutdown handlers
process.on('SIGTERM', () => gracefulShutdown(server, 'SIGTERM'));
process.on('SIGINT', () => gracefulShutdown(server, 'SIGINT'));

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please use a different port.`);
    process.exit(1);
  } else {
    console.error('Server error:', error);
    process.exit(1);
  }
});

// Export for testing
export default server;