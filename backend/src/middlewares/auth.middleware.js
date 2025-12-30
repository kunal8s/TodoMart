import { verifyToken } from '../utils/jwt.util.js';

/**
 * Authentication Middleware
 * Verifies JWT token from cookies or Authorization header
 * Protects routes requiring authentication
 */
export const authMiddleware = async (req, res, next) => {
    try {
        // Get token from cookie or Authorization header
        let token = req.cookies?.authToken;

        // Check Authorization header if no cookie
        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

        // No token found
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required. Please sign in.',
            });
        }

        // Verify token
        try {
            const decoded = verifyToken(token);
            req.user = decoded;
            next();
        } catch (tokenError) {
            console.error('Token verification failed:', tokenError.message);

            // Clear invalid cookie
            res.clearCookie('authToken');

            return res.status(401).json({
                success: false,
                message: 'Session expired. Please sign in again.',
            });
        }

    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({
            success: false,
            message: 'Authentication error',
        });
    }
};

/**
 * Optional Auth Middleware
 * Attaches user if token exists but doesn't require it
 */
export const optionalAuth = async (req, res, next) => {
    try {
        let token = req.cookies?.authToken;

        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

        if (token) {
            try {
                const decoded = verifyToken(token);
                req.user = decoded;
            } catch (tokenError) {
                // Token invalid but optional, continue without user
                req.user = null;
            }
        }

        next();
    } catch (error) {
        next();
    }
};
