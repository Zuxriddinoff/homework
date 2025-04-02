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

export const getAllComments = async () => {
    try {
        const result = await client.query('SELECT * FROM comments');
        return result.rows;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

export const getCommentById = async (id) => {
    try {
        const result = await client.query('SELECT * FROM comments WHERE id = $1', [id]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error fetching comment:', error);
        throw error;
    }
};

export const createComment = async (body) => {
    try {
        if (!body.user_id || !body.post_id || !body.content) {
            throw new Error("Komment yaratishda barcha maydonlar to'liq emas!");
        }

        const result = await client.query(
            `INSERT INTO comments (user_id, post_id, content) 
            VALUES ($1, $2, $3) RETURNING *`,
            [body.user_id, body.post_id, body.content]
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
};

export const updateComment = async (id, body) => {
    try {
        if (Object.keys(body).length === 0) {
            throw new Error("Yangilash uchun kamida bitta maydon kerak");
        }

        const fields = Object.keys(body);
        const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(", ");
        const values = [id, ...fields.map(field => body[field])];

        const query = `UPDATE comments SET ${setClause} WHERE id = $1 RETURNING *`;
        const result = await client.query(query, values);

        if (result.rows.length === 0) {
            throw new Error("Komment topilmadi");
        }

        return result.rows[0];
    } catch (error) {
        console.error("Error updating comment:", error);
        throw error;
    }
};

export const deleteComment = async (id) => {
    try {
        const result = await client.query('DELETE FROM comments WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            throw new Error("O‘chiriladigan komment topilmadi");
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};
