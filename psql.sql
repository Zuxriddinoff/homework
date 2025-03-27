create table users (
    id serial primary key,
    name varchar(49),
    age int,
    hobby varchar (50),
    birthDate date
);

insert into users (name,age,hobby,birthDate) values 
('Diyor', 19,'football','27-03-2006');