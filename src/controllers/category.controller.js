import { db } from '../db/index.js';

export class CategoryController {
    async create(req, res) {
        try {
            const { name } = req.body;
            const result = await db.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);

            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: result?.rows[0]
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }

    async getAll(_, res) {
        try {
            const result = await db.query('SELECT * FROM categories');

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: result?.rows
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }

    async getById(req, res) {
        try {
            const result = await db.query('SELECT * FROM categories WHERE id = $1', [req.params.id]);

            if (!result?.rows[0]) {
                return res.status(404).json({
                    error: 'Category not found'
                });
            }

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: result?.rows[0]
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const result = await db.query('UPDATE categories SET name = $1 WHERE id = $2 RETURNING *', [req.body.name, req.params.id]);

            if (!result?.rows[0]) {
                return res.status(400).json({
                    error: 'Category not found'
                });
            }

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: result?.rows[0]
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }

    async delete(req, res) {
        try {
            const result = await db.query('DELETE FROM categories WHERE id = $1 RETURNING *', [req.params.id]);

            if (!result?.rows[0]) {
                return res.status(400).json({
                    error: 'Category not found'
                });
            }

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }
}