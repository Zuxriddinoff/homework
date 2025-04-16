import dotenv from 'dotenv';

dotenv.config();

export const config = {
    db: {
        url: process.env.DATABASE_URL,
    },
};
console.log(config.db);  
