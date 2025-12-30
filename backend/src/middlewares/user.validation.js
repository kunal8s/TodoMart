import Joi from 'joi';

// Update profile validation schema
const updateProfileSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .optional()
        .messages({
            'string.min': 'First name must be at least 2 characters',
            'string.max': 'First name cannot exceed 50 characters',
        }),

    lastName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .optional()
        .messages({
            'string.min': 'Last name must be at least 2 characters',
            'string.max': 'Last name cannot exceed 50 characters',
        }),

    email: Joi.string()
        .trim()
        .lowercase()
        .email({ tlds: { allow: false } })
        .max(100)
        .optional()
        .messages({
            'string.email': 'Please enter a valid email address',
            'string.max': 'Email cannot exceed 100 characters',
        }),
});

export const validateUpdateProfile = (req, res, next) => {
    const { error, value } = updateProfileSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });

    if (error) {
        const errors = error.details.reduce((acc, curr) => {
            acc[curr.path[0]] = curr.message;
            return acc;
        }, {});

        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors,
        });
    }

    // At least one field must be provided
    if (!value.firstName && !value.lastName && !value.email) {
        return res.status(400).json({
            success: false,
            message: 'At least one field must be provided to update',
        });
    }

    req.validatedData = value;
    next();
};
