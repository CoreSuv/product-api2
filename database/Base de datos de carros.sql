/*CREATE DATABASE CarDB*/
USE CarDB;

CREATE TABLE products (
    car_id INT IDENTITY(1,1) PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    kilometers INT,
    type VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    fuel_type VARCHAR(50) NOT NULL,
    transmission VARCHAR(50) NOT NULL,
    images TEXT,
    description TEXT
);
