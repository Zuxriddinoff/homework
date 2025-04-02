import pg from 'pg';

const { Client } = pg;

const client = new Client({
    user: 'postgres',
    password: 'lznroma',
    host: 'localhost',
    port: 5432,
    database: 'uyga_vazifa',
});

await client.connect();

export const getAllPosts = async () => {
    try {
        const result = await client.query('SELECT * FROM posts');
        return result.rows;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const getPostById = async (id) => {
    try {
        const result = await client.query('SELECT * FROM posts WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
};

export const createPost = async (body) => {
    try {
        const { title, content, slug, user_id } = body;
        if (!title || !content || !slug || !user_id) {
            throw new Error("Barcha maydonlar to‘ldirilishi shart!");
        }

        const result = await client.query(
            `INSERT INTO posts (title, content, slug, user_id) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [title, content, slug, user_id]
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

export const updatePost = async (id, body) => {
    try {
        const fields = Object.keys(body);
        if (fields.length === 0) {
            throw new Error("Yangilash uchun kamida bitta maydon kerak!");
        }

        const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(", ");
        const values = [id, ...fields.map(field => body[field])];

        const query = `UPDATE posts SET ${setClause} WHERE id = $1 RETURNING *`;
        const result = await client.query(query, values);

        if (result.rows.length === 0) {
            throw new Error("Post topilmadi!");
        }

        return result.rows[0];
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
};

export const deletePost = async (id) => {
    try {
        const result = await client.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};
