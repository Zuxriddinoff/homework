CREATE DATABASE uyga vazifa;
\c uyga_vazifa;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50),
    phone_number VARCHAR(50),
    address VARCHAR(50)
);

INSERT INTO users (first_name, last_name, email, password, phone_number, address) VALUES
('Ali', 'Valiyev', 'Ali@gmail.com', '12345678', '+998999999999', 'Toshkent'),
('Ali', 'Valiyev', 'Ali@gmail.com', '12345678', '+998999999999', 'Toshkent'),
('Ali', 'Valiyev', 'Ali@gmail.com', '12345678', '+998999999999', 'Toshkent'),
('Ali', 'Valiyev', 'Ali@gmail.com', '12345678', '+998999999999', 'Toshkent'); 

SELECT * FROM users;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    content TEXT,
    slug VARCHAR(50),
    user_id INT REFERENCES users(id)
);


INSERT INTO posts (title, content, slug, user_id) VALUES
('Post 1', 'Content 1', 'post-1', 1),
('Post 2', 'Content 2', 'post-2', 2),
('Post 3', 'Content 3', 'post-3', 3),
('Post 4', 'Content 4', 'post-4', 4);

SELECT users.id, users.first_name, posts.title, posts.content 
FROM users
JOIN posts ON users.id = posts.user_id;


CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT,
    post_id INT REFERENCES posts(id),
    user_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO comments (content, post_id, user_id) VALUES
('Comment 1', 1, 1),
('Comment 2', 2, 2),
('Comment 3', 3, 3),
('Comment 4', 4, 4);


UPDATE users SET first_name = 'Vali' WHERE id = 1;

SELECT users.id, users.first_name, users.last_name, posts.id, posts.title
FROM users
JOIN posts ON users.id = posts.user_id;



UPDATE posts SET user_id = 1 WHERE user_id = 2;
DELETE FROM users WHERE id = 2;
