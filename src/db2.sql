USE sistemaclinica;

DROP TABLE IF EXISTS user;
CREATE TABLE user (
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
    PRIMARY KEY (email)
);
INSERT INTO user (email, name, password)
VALUES
('danielp@gmail.com', 'Mario Palacios', 'daniel123'),
('janedoe@example.com', 'Jane Doe', 'securepass456'),
('admin@example.com', 'Admin', 'adminpass789');