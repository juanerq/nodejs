DROP DATABASE IF EXISTS my_store;
CREATE SCHEMA my_store;

USE my_store;

CREATE TABLE roles(
	role_id int primary key not null auto_increment,
    name char(30) not null
);

CREATE TABLE users(
	user_id int primary key not null auto_increment,
    role_id int not null,
    name varchar(50) not null,
    email varchar(100) unique not null,
    password varchar(100) not null,
    image varchar(255),
    is_block boolean default false,
    created_at datetime default current_timestamp,
    updated_at datetime default current_timestamp,
    foreign key(role_id) references roles(role_id)
);

CREATE TABLE categories(
	category_id int primary key not null auto_increment,
    user_id int not null,
    name varchar(100) not null,
    is_block boolean default false,
    foreign key(user_id) references users(user_id)
);

CREATE TABLE products(
	product_id int primary key not null auto_increment,
    user_id int not null,
    category_id int not null,
    name varchar(50) not null,
    description varchar(100) not null,
    price int not null,
	image varchar(255),
    available boolean default true,
    created_at datetime default current_timestamp,
    updated_at datetime default current_timestamp,
    foreign key(user_id) references users(user_id),
    foreign key(category_id) references categories(category_id)
);

CREATE TABLE shopping_card(
	sc_id int primary key not null auto_increment,
    user_id int not null,
    product_id int not null,
    amount int not null default 1,
    foreign key(user_id) references users(user_id),
    foreign key(product_id) references products(product_id)
);

CREATE TABLE domiciles(
	domicile_id int primary key not null auto_increment,
    user_id int not null,
    address_1 varchar(50) not null,
    address_2 varchar(50),
    city varchar(50) not null,
    state varchar(50) not null,
    country varchar(50) not null,
    zip_code varchar(10),
    foreign key(user_id) references users(user_id)
);

CREATE TABLE payment_methods(
	pm_id int primary key not null auto_increment,
	name char(30) not null
);

CREATE TABLE credit_cards(
    card_id int primary key not null auto_increment,
    user_id int not null,
    name_card varchar(50) not null,
    card_number varchar(250) not null,
    security_code varchar(100) not null,
    expiry_date date not null,
    foreign key(user_id) references users(user_id)
);

CREATE TABLE orders(
	order_id int primary key not null auto_increment,
    client_id int not null,
    vendor_id int not null,
    domicile_id int not null,
    payment_method_id int not null,
	card_id int not null,
    shipping_price int default 0,
    total int not null,
	created_at datetime default current_timestamp,
    updated_at datetime default current_timestamp,
    foreign key(client_id) references users(user_id),
	foreign key(vendor_id) references users(user_id),
    foreign key(domicile_id) references domiciles(domicile_id),
    foreign key(card_id) references credit_cards(card_id),
    foreign key(payment_method_id) references payment_methods(pm_id)
);

CREATE TABLE order_detail(
	od_id int primary key not null auto_increment,
    order_id int not null,
    product_id int not null,
    amount int not null,
    price int not null,
	date datetime default current_timestamp,
	foreign key(order_id) references orders(order_id),
    foreign key(product_id) references products(product_id)
);

insert into roles(name)
values('ADMIN_ROLE'),
('USER_ROLE');

insert into users(role_id, name, email, password)
values(1, 'JuanERQ', 'jrjuanreyes@gmail.com', '12345'),
(1, 'maria', 'maria@gmail.com', '12345'),
(1, 'fer', 'fer@gmail.com', '12345'),
(2, 'juli', 'julis@gmail.com', '12345'),
(2, 'liz', 'liz@gmail.com', '12345'),
(2, 'vanessa', 'vanessa@gmail.com', '12345'),
(1, 'jhonattan', 'jhonattan@gmail.com', '12345');

insert into categories(user_id, name)
values(1, 'TI');

insert into products(user_id, category_id, name, description, price)
values(1, 1, 'iphone', 'celular carooo', 20000);


