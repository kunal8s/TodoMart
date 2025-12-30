import Joi from 'joi';

// Create todo validation schema
const createTodoSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(255)
        .required()
        .messages({
            'string.empty': 'Todo name is required',
            'string.min': 'Todo name cannot be empty',
            'string.max': 'Todo name cannot exceed 255 characters',
        }),

    description: Joi.string()
        .trim()
        .max(2000)
        .allow('', null)
        .optional()
        .messages({
            'string.max': 'Description cannot exceed 2000 characters',
        }),
});

// Update todo validation schema
const updateTodoSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(255)
        .required()
        .messages({
            'string.empty': 'Todo name is required',
            'string.min': 'Todo name cannot be empty',
            'string.max': 'Todo name cannot exceed 255 characters',
        }),

    description: Joi.string()
        .trim()
        .max(2000)
        .allow('', null)
        .optional()
        .messages({
            'string.max': 'Description cannot exceed 2000 characters',
        }),
});

export const validateCreateTodo = (req, res, next) => {
    const { error, value } = createTodoSchema.validate(req.body, {
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

    req.validatedData = value;
    next();
};

export const validateUpdateTodo = (req, res, next) => {
    const { error, value } = updateTodoSchema.validate(req.body, {
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

    req.validatedData = value;
    next();
};
