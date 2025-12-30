import pool from '../database/dbPostgresql.js';
import { hashPassword } from '../utils/bcrypt.util.js';
import { generateToken } from '../utils/jwt.util.js';

export const signupController = async (req, res, next) => {
  let client;
  try {
    client = await pool.connect();
  } catch (connError) {
    console.error('Failed to get DB connection:', connError.message);
    return res.status(503).json({
      success: false,
      message: 'Database temporarily unavailable. Please try again.',
    });
  }

  try {
    const { firstName, lastName, email, password, newsletter } = req.validatedData;

    // Start transaction
    await client.query('BEGIN');

    // Check if email already exists
    const emailCheckQuery = 'SELECT id FROM users WHERE email = $1';
    const emailCheckResult = await client.query(emailCheckQuery, [email]);

    if (emailCheckResult.rows.length > 0) {
      await client.query('ROLLBACK');
      client.release();
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Insert user into database
    const insertUserQuery = `
      INSERT INTO users (
        first_name, 
        last_name, 
        email, 
        password_hash, 
        newsletter_subscribed,
        created_at,
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, first_name, last_name, email, newsletter_subscribed, created_at
    `;

    const insertResult = await client.query(insertUserQuery, [
      firstName,
      lastName,
      email,
      passwordHash,
      newsletter
    ]);

    const user = insertResult.rows[0];

    // Generate JWT token
    const token = generateToken(user.id, user.email);

    // Commit transaction
    await client.query('COMMIT');

    // Remove sensitive data
    const userResponse = {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      newsletterSubscribed: user.newsletter_subscribed,
      createdAt: user.created_at,
    };

    // Set cookie if needed (optional)
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: userResponse,
      token,
    });

  } catch (error) {
    // Rollback transaction on error
    await client.query('ROLLBACK');

    console.error('Signup controller error:', error);

    // Pass to error middleware
    next(error);

  } finally {
    // Release client back to pool
    if (client) {
      client.release();
    }
  }
};