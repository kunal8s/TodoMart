import pool from '../database/dbPostgresql.js';

/**
 * Get User Profile
 */
export const getProfile = async (req, res, next) => {
    let client;

    try {
        client = await pool.connect();
    } catch (connError) {
        console.error('Database connection failed:', connError.message);
        return res.status(503).json({
            success: false,
            message: 'Service temporarily unavailable. Please try again later.',
        });
    }

    try {
        const userId = req.user.userId;

        const query = `
      SELECT id, first_name, last_name, email, newsletter_subscribed, created_at, updated_at
      FROM users
      WHERE id = $1
    `;

        const result = await client.query(query, [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const user = result.rows[0];

        return res.status(200).json({
            success: true,
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                newsletterSubscribed: user.newsletter_subscribed,
                createdAt: user.created_at,
                updatedAt: user.updated_at,
            },
        });

    } catch (error) {
        console.error('Get profile error:', error);
        return next(error);
    } finally {
        if (client) client.release();
    }
};

/**
 * Update User Profile
 */
export const updateProfile = async (req, res, next) => {
    let client;

    try {
        client = await pool.connect();
    } catch (connError) {
        console.error('Database connection failed:', connError.message);
        return res.status(503).json({
            success: false,
            message: 'Service temporarily unavailable. Please try again later.',
        });
    }

    try {
        const userId = req.user.userId;
        const { firstName, lastName, email } = req.validatedData;

        // Check if email is being changed and if it's already taken
        if (email) {
            const emailCheck = await client.query(
                'SELECT id FROM users WHERE email = $1 AND id != $2',
                [email.toLowerCase().trim(), userId]
            );

            if (emailCheck.rows.length > 0) {
                return res.status(409).json({
                    success: false,
                    message: 'Email is already in use by another account',
                });
            }
        }

        const updateQuery = `
      UPDATE users
      SET 
        first_name = COALESCE($1, first_name),
        last_name = COALESCE($2, last_name),
        email = COALESCE($3, email),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING id, first_name, last_name, email, newsletter_subscribed, created_at, updated_at
    `;

        const result = await client.query(updateQuery, [
            firstName?.trim(),
            lastName?.trim(),
            email?.toLowerCase().trim(),
            userId,
        ]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const user = result.rows[0];

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                newsletterSubscribed: user.newsletter_subscribed,
                createdAt: user.created_at,
                updatedAt: user.updated_at,
            },
        });

    } catch (error) {
        console.error('Update profile error:', error);
        return next(error);
    } finally {
        if (client) client.release();
    }
};
