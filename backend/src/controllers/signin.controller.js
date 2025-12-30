import pool from '../database/dbPostgresql.js';
import { comparePassword } from '../utils/bcrypt.util.js';
import { generateToken } from '../utils/jwt.util.js';

/**
 * Signin Controller
 * Authenticates user credentials against the database
 * Returns JWT token and user data on successful authentication
 */
export const signinController = async (req, res, next) => {
    let client;

    try {
        // Acquire database connection with error handling
        try {
            client = await pool.connect();
        } catch (connError) {
            console.error('Database connection failed:', connError.message);
            return res.status(503).json({
                success: false,
                message: 'Service temporarily unavailable. Please try again later.',
            });
        }

        const { email, password } = req.validatedData;

        // Query user by email with rate limiting consideration
        const userQuery = `
      SELECT 
        id, 
        first_name, 
        last_name, 
        email, 
        password_hash,
        newsletter_subscribed,
        created_at,
        updated_at
      FROM users 
      WHERE email = $1
      LIMIT 1
    `;

        const userResult = await client.query(userQuery, [email.toLowerCase().trim()]);

        // Check if user exists
        if (userResult.rows.length === 0) {
            // Use generic error message to prevent email enumeration
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        const user = userResult.rows[0];

        // Verify password using bcrypt comparison
        const isPasswordValid = await comparePassword(password, user.password_hash);

        if (!isPasswordValid) {
            // Log failed attempt for security monitoring (in production, implement rate limiting)
            console.log(`Failed login attempt for email: ${email} at ${new Date().toISOString()}`);

            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Generate JWT token with user payload
        const token = generateToken(user.id, user.email);

        // Prepare sanitized user response (exclude sensitive data)
        const userResponse = {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            newsletterSubscribed: user.newsletter_subscribed,
            createdAt: user.created_at,
        };

        // Set HTTP-only cookie for enhanced security
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: '/',
        };

        res.cookie('authToken', token, cookieOptions);

        // Log successful authentication
        console.log(`User authenticated successfully: ${user.email} at ${new Date().toISOString()}`);

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Verified successfully! Welcome back.',
            user: userResponse,
            token,
        });

    } catch (error) {
        console.error('Signin controller error:', error);

        // Pass to error handling middleware
        return next(error);

    } finally {
        // Always release the database client back to the pool
        if (client) {
            client.release();
        }
    }
};

/**
 * Logout Controller
 * Clears authentication cookies and invalidates session
 */
export const logoutController = async (req, res) => {
    try {
        // Clear the auth cookie
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            path: '/',
        });

        return res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        });

    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error during logout',
        });
    }
};