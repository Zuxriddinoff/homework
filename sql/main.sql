CREATE DATABASE phones;


CREATE TABLE phones(
    phone_id SERIAL primary key,
    model varchar(225) not null,
    price float not null,
    manufacture varchar(50) not null,
    memory int not null
);

CREATE TABLE client(
    client_id SERIAL primary key,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    phone varchar(50) unique not null
);

CREATE TABLE employess(
    employess_id SERIAL primary key,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    position varchar(50)
);

CREATE TABLE orders (
    order_id SERIAL primary key,
    phone_id int references phones(phone_id) not null,
    client_id int references client(client_id) not null,
    employess_id int references employess(employess_id)not null,
    order_date timestamp default current_timestamp,
    quantity int not null,
    all_price float not null
);

-- Telefonlar ro‘yxati


-- Mijozlar ro‘yxati
INSERT INTO client (first_name, last_name, phone) VALUES
('Ali', 'Valiyev', '+998901234567'),
('Botir', 'Karimov', '+998911112233'),
('Gulnoza', 'Yusupova', '+998977778899'),
('Dilshod', 'Akramov', '+998933334455'),
('Madina', 'Ibragimova', '+998935551122');

-- Xodimlar ro‘yxati
INSERT INTO employess (first_name, last_name, position) VALUES
('Aziz', 'Eshmatov', 'Sotuvchi'),
('Muhammad', 'Aliyev', 'Menejer'),
('Olim', 'Rasulov', 'Kassir');

-- Buyurtmalar ro‘yxati
INSERT INTO orders (phone_id, client_id, employess_id, quantity, all_price) VALUES
(1, 1, 1, 1, 999.99),
(2, 2, 2, 2, 1599.98),
(3, 3, 3, 1, 599.99),
(4, 4, 1, 1, 699.99),
(5, 5, 2, 2, 1459.98);


-- Telefonlar ro‘yxatini ko‘rish
SELECT * FROM phones;

-- Mijozlar ro‘yxatini ko‘rish
SELECT * FROM client;

-- Xodimlar ro‘yxatini ko‘rish
SELECT * FROM employess;

-- Buyurtmalar ro‘yxatini ko‘rish
SELECT * FROM orders;

--1
SELECT manufacture, avg(price) from phones GROUP BY manufacture;

--2
SELECT 
    c.first_name,
    c.last_name,
    count(o.order_id) as total_phones_bought,
    sum(o.quantity) AS total_quantity
from client c
JOIN orders o ON c.client_id = o.client_id
GROUP BY c.client_id, c.first_name,c.last_name
ORDER BY c.client_id;

--3
SELECT 
    e.first_name,
    e.last_name,
    COUNT(o.order_id) AS total_sales
FROM employess e
JOIN orders o ON e.employess_id = o.employess_id
GROUP BY e.employess_id, e.first_name, e.last_name
ORDER BY total_sales DESC
LIMIT 1;

--4
SELECT 
    model, 
    price 
FROM phones
ORDER BY price DESC
LIMIT 5 OFFSET 4;

--5
SELECT 
    manufacture,
    AVG(price) AS avg_price,
    MAX(price) AS max_price,
    MIN(price) AS min_price
FROM phones
GROUP BY manufacture;

--6
SELECT 
    manufacture,
    model,
    memory
FROM phones p
WHERE memory = (
    SELECT MAX(memory) 
    FROM phones p2 
    WHERE p2.manufacture = p.manufacture
)
GROUP BY manufacture, model, memory;

--7
SELECT 
    p.model,
    COUNT(o.order_id) AS total_sold,
    AVG(o.all_price / o.quantity) AS avg_price
FROM phones p
JOIN orders o ON p.phone_id = o.phone_id
GROUP BY p.model
ORDER BY total_sold DESC;