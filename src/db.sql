-- Active: 1726613993689@@127.0.0.1@3306@sistemaclinica
CREATE DATABASE IF NOT EXISTS sistemaclinica;
USE sistemaclinica;
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(100) NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    estado TINYINT(1) DEFAULT 1
);
INSERT INTO user (email, name, password)
VALUES
('johndoe@example.com', 'John Doe', 'password123'),
('janedoe@example.com', 'Jane Doe', 'securepass456'),
('admin@example.com', 'Admin', 'adminpass789');