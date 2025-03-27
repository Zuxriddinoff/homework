create table users (
    user_id serial primary key,
    first_name varchar(50),
    email varchar(50) not null unique,
    last_name varchar(50) not null,
    password varchar(50) not null,
    phone_number varchar(50) not null unique,
    address varchar(50) not null,
    created_at timestamp default current_timestamp
);

INSERT INTO users (first_name, email, last_name, password, phone_number, address) 
VALUES 
    ('Ali', 'ali@example.com', 'Karimov', 'password123', '+998901234567', 'Tashkent, Uzbekistan'),
    ('Zarina', 'zarina@example.com', 'Turgunova', 'securepass', '+998902345678', 'Samarkand, Uzbekistan'),
    ('Javohir', 'javohir@example.com', 'Xolmatov', 'strongpass', '+998903456789', 'Bukhara, Uzbekistan'),
    ('Madina', 'madina@example.com', 'Nazarova', 'madina2024', '+998904567890', 'Fergana, Uzbekistan'),
    ('Rustam', 'rustam@example.com', 'Saidov', 'rustamPass', '+998905678901', 'Andijan, Uzbekistan'),
    ('Dilnoza', 'dilnoza@example.com', 'Rakhimova', 'passDilnoza', '+998906789012', 'Namangan, Uzbekistan'),
    ('Timur', 'timur@example.com', 'Bekmurodov', 'TimurSuper', '+998907890123', 'Khorezm, Uzbekistan'),
    ('Shahzod', 'shahzod@example.com', 'Ganiyev', 'ShahSecure', '+998908901234', 'Navoi, Uzbekistan'),
    ('Laylo', 'laylo@example.com', 'Asadova', 'LayloPass', '+998909012345', 'Jizzakh, Uzbekistan'),
    ('Komil', 'komil@example.com', 'Yusupov', 'KomilSecret', '+998901112233', 'Termez, Uzbekistan');


create table posts (
    post_id serial primary key,
    title varchar(50),
    content text,
    slug varchar,
    created_at timestamp default current_timestamp,
    author_id smallint,
    foreign key (author_id) references users(user_id)
);

INSERT INTO posts (title, content, slug, author_id) 
VALUES 
    ('First Post', 'This is the content of the first post.', 'first-post', 1),
    ('Learning SQL', 'SQL is essential for backend development.', 'learning-sql', 2),
    ('PostgreSQL Tips', 'How to optimize queries in PostgreSQL.', 'postgresql-tips', 3),
    ('Web Development', 'Modern web development trends.', 'web-development', 4),
    ('React vs Vue', 'Comparing React and Vue for front-end.', 'react-vs-vue', 5),
    ('Database Design', 'Best practices for relational databases.', 'database-design', 6),
    ('Security in Web Apps', 'How to protect web applications.', 'security-web-apps', 7),
    ('API Development', 'Building RESTful and GraphQL APIs.', 'api-development', 8),
    ('Performance Optimization', 'Ways to make your web app faster.', 'performance-optimization', 9),
    ('Scaling Applications', 'Techniques to scale web applications.', 'scaling-applications', 10);


create table comments(
    comments_id serial primary key,
    content text,
    post_id smallint not null,
    user_id smallint not null,
    author_id smallint not null,
    foreign key (post_id) references posts(post_id),
    foreign key (user_id) references users(user_id),
    created_at timestamp default current_timestamp
);

INSERT INTO comments (content, post_id, user_id, author_id) 
VALUES 
    ('Great post! Thanks for sharing.', 1, 2, 1),
    ('Very informative, I learned a lot.', 2, 3, 2),
    ('Can you explain more about indexes?', 3, 4, 3),
    ('I prefer Vue over React. What do you think?', 4, 5, 4),
    ('This is exactly what I needed!', 5, 6, 5),
    ('Security is crucial. Thanks for the insights.', 6, 7, 6),
    ('How do you handle authentication?', 7, 8, 7),
    ('Awesome! Looking forward to more content.', 8, 9, 8),
    ('Performance is key. Any caching tips?', 9, 10, 9),
    ('Scaling is always a challenge. Thanks for sharing!', 10, 1, 10);









