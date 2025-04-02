import * as commentServices from "../services/commentServeces.js";

export const getAllComments = async (req, res) => {
    try {
        const comments = await commentServices.getAllComments();
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
    }
};

export const getCommentById = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await commentServices.getCommentById(id);
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).json({ error: 'Komment topilmadi' });
        }
    } catch (error) {
        console.error('Error fetching comment:', error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
    }
};

export const createComment = async (req, res) => {
    try {
        const comment = await commentServices.createComment(req.body);
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Komment yaratishda xatolik", details: error.message });
    }
};

export const updateComment = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedComment = await commentServices.updateComment(id, req.body);
        res.status(200).json(updatedComment);
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(400).json({ error: "Yangilashda xatolik", details: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await commentServices.deleteComment(id);
        res.status(200).json({ message: "Komment o'chirildi✅" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Kommentni o‘chirishda xatolik", details: error.message });
    }
};
