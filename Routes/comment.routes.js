import express from "express";
import { getAllComments, getCommentById, createComment, updateComment, deleteComment } from "../Controller/comments.controller.js";

const router = express.Router();

router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router
