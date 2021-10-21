CREATE DATABASE checkout;

USE checkout;

CREATE TABLE customer (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(20) NOT NULL,
    address1 VARCHAR(100) NOT NULL,
    address2 VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip_code INT(5) NOT NULL,
    phone INT(10) NOT NULL,
    card_number VARCHAR(30) NOT NULL,
    expiry_date VARCHAR(20) NOT NULL,
    billing_zipcode INT(5),
    PRIMARY KEY (id)
)