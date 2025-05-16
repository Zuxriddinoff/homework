import { db } from '../db/index.js';

export class ProductController {
    async create(req, res) {
        try {
            const { name, price, category_id } = req.body;
            const category = await db.query('SELECT id FROM categories WHERE id = $1', [category_id]);

            if (!category?.rows[0]) {
                return res.status(404).json({
                    error: `Category not found ${category_id}`
                });
            }

            const result = await db.query('INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *', [name, price, category_id]);

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
            const result = await db.query('SELECT * FROM products');

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
            const { name, price, category_id } = req.body;
            const category = await db.query('SELECT id FROM categories WHERE id = $1', [category_id]);

            if (!category?.rows[0]) {
                return res.status(404).json({
                    error: `Category not found ${category_id}`
                });
            }

            const result = await db.query('UPDATE products SET name = $1, price = $2, category_id = $3 WHERE id = $4 RETURNING *', [name, price, category_id, req.params.id]);

            if (!result?.rows[0]) {
                return res.status(400).json({
                    error: 'Error on updating product'
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
            const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [req.params.id]);

            if (!result?.rows[0]) {
                return res.status(400).json({
                    error: 'Product not found'
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