DROP DATABASE IF EXISTS inventory_db;
CREATE DATABASE inventory_db;

USE inventory_db;

CREATE TABLE drawing(
  id INTEGER NOT NULL,
  drawing_name VARCHAR(30),
  drawing_description CANVAS,
  category_name VARCHAR(30),
  price DECIMAL(10,2),
  in_stock BOOLEAN 
);

CREATE TABLE categories(
  id INTEGER NOT NULL,
  category_name VARCHAR(30),
  category_description TEXT
);