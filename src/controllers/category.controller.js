import { db } from "../models/index.js";

export class CategoryController {
    async create(req, res) {
        try {
            const category = await db.Category.create(req.body);

            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: category
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    async getAll(_, res) {
        try {
            const categories = await db.Category.findAll({ include: { all: true } });

            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: categories
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const category = await db.Category.findByPk(id, { include: { all: true } });
            
            if (!category) {
                return res.status(404).json({
                    error: `Category not found by id: ${id}`
                });
            }

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: category
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const category = await db.Category.findByPk(id);
            
            if (!category) {
                return res.status(404).json({
                    error: `Category not found by id: ${id}`
                });
            }

            await db.Category.update(req.body, { where: { id } });

            const updatedCategory = await db.Category.findByPk(id, { include: { all: true } });
            
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: updatedCategory
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const category = await db.Category.findByPk(id);
            
            if (!category) {
                return res.status(404).json({
                    error: `Category not found by id: ${id}`
                });
            }

            await db.Category.destroy({ where: { id } });

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
}