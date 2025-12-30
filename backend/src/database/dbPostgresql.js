import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  },
  // Pool configuration for Neon serverless
  max: 10, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 30000, // Wait up to 30 seconds for a connection
  keepAlive: true, // Keep connections alive
  keepAliveInitialDelayMillis: 10000, // Start keep-alive after 10 seconds
});

pool.on('connect', () => {
  console.log('PostgreSQL Database connected successfully...✅✈️');
});

pool.on('error', (err) => {
  console.error('PostgreSQL pool error ❌', err);
  // DO NOT crash server
});

export default pool;
