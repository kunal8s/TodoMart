import pool from '../database/dbPostgresql.js';

/**
 * Todo Controller - CRUD Operations for Todo Items
 * Handles Create, Read, Update, Delete operations for user todos
 */

// Create a new todo item
export const createTodo = async (req, res, next) => {
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
        const { name, description } = req.validatedData;
        const userId = req.user.userId;

        const insertQuery = `
      INSERT INTO todo_items (name, description, user_id, created_at, updated_at)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING todo_id, name, description, user_id, created_at, updated_at
    `;

        const result = await client.query(insertQuery, [name, description || null, userId]);
        const todo = result.rows[0];

        return res.status(201).json({
            success: true,
            message: 'Todo item created successfully',
            todo: {
                id: todo.todo_id,
                name: todo.name,
                description: todo.description,
                createdAt: todo.created_at,
                updatedAt: todo.updated_at,
            },
        });

    } catch (error) {
        console.error('Create todo error:', error);
        return next(error);
    } finally {
        if (client) client.release();
    }
};

// Get all todos for the authenticated user
export const getTodos = async (req, res, next) => {
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

        const selectQuery = `
      SELECT todo_id, name, description, created_at, updated_at
      FROM todo_items
      WHERE user_id = $1
      ORDER BY created_at DESC
    `;

        const result = await client.query(selectQuery, [userId]);

        const todos = result.rows.map(todo => ({
            id: todo.todo_id,
            name: todo.name,
            description: todo.description,
            createdAt: todo.created_at,
            updatedAt: todo.updated_at,
        }));

        return res.status(200).json({
            success: true,
            count: todos.length,
            todos,
        });

    } catch (error) {
        console.error('Get todos error:', error);
        return next(error);
    } finally {
        if (client) client.release();
    }
};

// Get a single todo by ID
export const getTodoById = async (req, res, next) => {
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
        const { todoId } = req.params;
        const userId = req.user.userId;

        const selectQuery = `
      SELECT todo_id, name, description, created_at, updated_at
      FROM todo_items
      WHERE todo_id = $1 AND user_id = $2
    `;

        const result = await client.query(selectQuery, [todoId, userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Todo item not found',
            });
        }

        const todo = result.rows[0];

        return res.status(200).json({
            success: true,
            todo: {
                id: todo.todo_id,
                name: todo.name,
                description: todo.description,
                createdAt: todo.created_at,
                updatedAt: todo.updated_at,
            },
        });

    } catch (error) {
        console.error('Get todo by ID error:', error);
        return next(error);
    } finally {
        if (client) client.release();
    }
};

// Update a todo item
export const updateTodo = async (req, res, next) => {
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
        const { todoId } = req.params;
        const { name, description } = req.validatedData;
        const userId = req.user.userId;

        // Verify ownership first
        const checkQuery = `SELECT todo_id FROM todo_items WHERE todo_id = $1 AND user_id = $2`;
        const checkResult = await client.query(checkQuery, [todoId, userId]);

        if (checkResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Todo item not found or access denied',
            });
        }

        const updateQuery = `
      UPDATE todo_items
      SET name = $1, description = $2, updated_at = CURRENT_TIMESTAMP
      WHERE todo_id = $3 AND user_id = $4
      RETURNING todo_id, name, description, created_at, updated_at
    `;

        const result = await client.query(updateQuery, [name, description || null, todoId, userId]);
        const todo = result.rows[0];

        return res.status(200).json({
            success: true,
            message: 'Todo item updated successfully',
            todo: {
                id: todo.todo_id,
                name: todo.name,
                description: todo.description,
                createdAt: todo.created_at,
                updatedAt: todo.updated_at,
            },
        });

    } catch (error) {
        console.error('Update todo error:', error);
        return next(error);
    } finally {
        if (client) client.release();
    }
};

// Delete a single todo item
export const deleteTodo = async (req, res, next) => {
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
        const { todoId } = req.params;
        const userId = req.user.userId;

        const deleteQuery = `
      DELETE FROM todo_items
      WHERE todo_id = $1 AND user_id = $2
      RETURNING todo_id
    `;

        const result = await client.query(deleteQuery, [todoId, userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Todo item not found or access denied',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Todo item deleted successfully',
        });

    } catch (error) {
        console.error('Delete todo error:', error);
        return next(error);
    } finally {
        if (client) client.release();
    }
};

// Delete multiple todo items
export const deleteMultipleTodos = async (req, res, next) => {
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
        const { todoIds } = req.body;
        const userId = req.user.userId;

        if (!todoIds || !Array.isArray(todoIds) || todoIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an array of todo IDs to delete',
            });
        }

        // Sanitize and validate IDs
        const validIds = todoIds.filter(id => Number.isInteger(Number(id)) && Number(id) > 0);

        if (validIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No valid todo IDs provided',
            });
        }

        const deleteQuery = `
      DELETE FROM todo_items
      WHERE todo_id = ANY($1::int[]) AND user_id = $2
      RETURNING todo_id
    `;

        const result = await client.query(deleteQuery, [validIds, userId]);

        return res.status(200).json({
            success: true,
            message: `${result.rowCount} todo item(s) deleted successfully`,
            deletedCount: result.rowCount,
        });

    } catch (error) {
        console.error('Delete multiple todos error:', error);
        return next(error);
    } finally {
        if (client) client.release();
    }
};
