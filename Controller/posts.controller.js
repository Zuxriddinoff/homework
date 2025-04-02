import * as postServices from "../services/postsServices.js";

export const getAllPosts = async (req, res) => {
    try {
        const posts = await postServices.getAllPosts();
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
    }
};

export const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postServices.getPostById(id);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: 'Post topilmadi' });
        }
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
    }
};

export const createPost = async (req, res) => {
    const body = req.body;
    try {
        const post = await postServices.createPost(body);
        if (post) {
            res.status(201).json(post);
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Post yaratishda xatolik", details: error.message });
    }
};

export const updatePost = async (req, res) => {
    const body = req.body;
    const id = parseInt(req.params.id);
    try {
        const post = await postServices.updatePost(id, body);
        if (post) {
            res.status(201).json(post);
        }
    } catch (error) {
        res.status(400).json({ error: "Postni yangilashda xatolik", details: error.message });
    }
};

export const deletePost = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const post = await postServices.deletePost(id);
        if (!post) {
            return res.status(400).send("Post topilmadi!❌");
        }
        res.status(200).send("Post o'chirildi✅");
    } catch (error) {
        console.error(error);
        res.status(400).send("Xatolik yuz berdi!");
    }
};
