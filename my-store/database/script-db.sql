DROP DATABASE IF EXISTS my_store;

CREATE SCHEMA my_store;
USE my_store;

CREATE TABLE products (
	id int primary key not null auto_increment,
    name varchar(50) not null,
    price int not null,
	image varchar(100),
    isBlock boolean default false
);

INSERT INTO products(name, price, image)
VALUE ('reloj', 2000, 'https://image.png'),
('iphon', 9000, 'https://image.png'),
('colchon', 2000, 'https://image.png'),
('laptop', 9000, 'https://image.png'),
('monitor', 5000, 'https://image.png'),
('mouse', 1000, 'https://image.png'),
('escritorio', 10000, 'https://image.png'),
('tv', 92000, 'https://image.png');



