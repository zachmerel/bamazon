DROP DATABASE IF EXISTS products_DB;
CREATE DATABASE products_DB;

USE products_DB;

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
	price DECIMAL (10,2) default 0,
    stock_quantity INT default 0,
    PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pen","office supplies", 1.0, 5), ("pillow case","home goods", 5.50, 10), ("coffee table","furniture", 30.25, 6), 
("keyboard","electronics", 38.0, 20), ("headphones","electronics", 27.50, 15), ("speakers","electronics", 80.25, 24),
("binders","office supplies", 3.75, 50), ("coffee mug","home goods", 6.50, 19), ("chair","furniture", 29.25, 22),
("golf balls", "sporting equpiment", 19.95, 32);