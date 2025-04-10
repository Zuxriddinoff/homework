create table if not exists users(
    user_id serial primary key,
    name varchar(100),
    email varchar(100),
    age smallint,
    created_at timestamp
);

INSERT INTO users (name, email, age, created_at) VALUES
('Ali Karimov', 'ali.karimov@example.com', 25, NOW()),
('Zarina Abdullaeva', 'zarina.abdullaeva@example.com', 30, NOW()),
('Bekzod Ismoilov', 'bekzod.ismoilov@example.com', 22, NOW()),
('Dilnoza Toshpulatova', 'dilnoza.t@example.com', 27, NOW()),
('Javlonbek Rahmatov', 'javlonbek.r@example.com', 24, NOW()),
('Madina Qodirova', 'madina.q@example.com', 28, NOW()),
('Shahzodbek Yoqubov', 'shahzodbek.y@example.com', 31, NOW()),
('Nozima Sobirova', 'nozima.s@example.com', 26, NOW()),
('Diyorbek Mamatov', 'diyorbek.m@example.com', 29, NOW()),
('Nodira Umarova', 'nodira.u@example.com', 23, NOW());

create table products (
    product_id serial primary key,
    name varchar(100),
    category varchar(100),
    price decimal(10,2),
    stock int
);

INSERT INTO products (name, category, price, stock) VALUES
('iPhone 14', 'Electronics', 999.99, 25),
('Samsung Galaxy S23', 'Electronics', 899.99, 30),
('MacBook Air', 'Computers', 1199.99, 15),
('Dell XPS 13', 'Computers', 1099.49, 20),
('Sony WH-1000XM5', 'Audio', 349.99, 50),
('Bose QuietComfort 45', 'Audio', 329.00, 40),
('Nike Air Max 270', 'Footwear', 150.00, 100),
('Adidas Ultraboost', 'Footwear', 180.00, 90),
('Apple Watch Series 9', 'Wearables', 399.99, 35),
('Fitbit Charge 5', 'Wearables', 149.95, 60);

select category, count(stock) as stock_count from products
group by category;

select * from products
order by price desc
limit 3;

select * from products
where stock <= 15;

create table payment(
    payment_id serial primary key,
    user_id int references users(user_id),
    amount decimal(10,2),
    payment_date date
);

INSERT INTO payment (user_id, amount, payment_date) VALUES
(1, 99.99, '2025-04-01'),
(2, 150.00, '2025-04-01'),
(9, 200.50, '2025-03-02'),
(4, 89.00, '2025-04-02'),
(1, 300.00, '2025-04-03'),
(10, 50.75, '2025-03-03'),
(2, 120.00, '2025-04-04'),
(3, 175.25, '2025-04-04'),
(7, 220.00, '2025-03-05'),
(5, 99.95, '2025-04-05');

select u.name, sum(p.amount) from payment as p
join users as u
on p.user_id = u.user_id
group by u.name;

select * from payment
where payment_date > now() - interval '30 days';

select * from payment
order by amount desc
limit 1;




