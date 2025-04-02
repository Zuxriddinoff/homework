import { v4 as uuidv4, v4 } from 'uuid';
import pg from 'pg';

const { Client } = pg;

const client = new Client({
    user: 'postgres',
    password: 'lznroma',
    host: 'localhost',
    port: 5432,
    database: 'uyga_vazifa',
})

await client.connect()

export const getAllUsers = async () => {
    try {
        const result = await client.query('SELECT * FROM users'); // `await` qo‘shildi
        return result.rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0]; // `await` qo‘shildi
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export const createUser = async (body) => {
    try {
        const newUser = { ...body}
        if(!newUser.first_name || !newUser.last_name || !newUser.email || !newUser.password || !newUser.password || !newUser.phone_number || !newUser.address){
            return res.status(400).send("foydalanuvchi yaratishda maydonlar to'liq emas!")
        }

        const result = await client.query(
            `INSERT INTO users (first_name, last_name, email, password, phone_number, address) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, 
            [newUser.first_name, newUser.last_name, newUser.email, newUser.password, newUser.phone_number, newUser.address]
        );

        return result.rows

    }catch(error){
        console.log(error);
    }
}

export const updateUser = async (id, body) => {
    try {
        const fields = Object.keys(body);
        if (fields.length === 0) {
            throw new Error("Yangilash uchun kamida bitta maydon kerak");
        }

        const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(", ");
        const values = [id, ...fields.map(field => body[field])];

        const query = `UPDATE users SET ${setClause} WHERE id = $1 RETURNING *`;
        const result = await client.query(query, values);

        if (result.rows.length === 0) {
            throw new Error("Foydalanuvchi topilmadi");
        }

        return result.rows[0];
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
