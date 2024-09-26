CREATE TABLE paciente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    expediente VARCHAR(50),
    nombre_paciente VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    edad INT,
    lugar_nacimiento VARCHAR(100),
    direccion VARCHAR(255),
    religion VARCHAR(50),
    etnia VARCHAR(50),
    discapacidad ENUM('SI', 'NO') DEFAULT 'NO',
    tipo_discapacidad VARCHAR(100), -- Física, Cognitiva, Mental, etc.
    grado_funcionalidad VARCHAR(100),
    necesidad_apoyos VARCHAR(255),
    escolaridad VARCHAR(100),
    grado VARCHAR(50),
    institucion VARCHAR(100),
    encargado VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100),
    referido_por VARCHAR(100),
    fecha_atencion DATE,
    hora_atencion TIME
);
