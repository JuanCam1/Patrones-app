Links para las solicitudes
http://localhost:3000/apiF/residents
http://localhost:3000/apiN/residents

Con el Flyweight y el pool de conexiones, tu API se volverá más eficiente y reducirá la carga innecesaria de crear y destruir conexiones repetidamente.

Reducción de la sobrecarga de memoria:

En lugar de crear múltiples instancias de un objeto, el patrón Flyweight permite crear instancias compartidas (flyweights). Estos objetos son más ligeros porque comparten el mismo estado interno (que es invariable) y solo mantienen el estado único (que puede cambiar) como parte de su contexto.

Flyweight puede incluir un pool de conexiones. En lugar de abrir y cerrar una conexión para cada solicitud a la base de datos, el sistema mantiene un conjunto de conexiones abiertas que se pueden reutilizar.

Al reducir la cantidad de objetos en memoria y la sobrecarga de conexión, el rendimiento general de la aplicación mejora. Las operaciones de lectura y escritura se vuelven más rápidas debido a la menor necesidad de gestionar múltiples conexiones o instancias.

CREATE DATABASE IF NOT EXISTS `conjuntos_db`;

USE `conjuntos_db`;

CREATE TABLE residents (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre_residente VARCHAR(255) NOT NULL,
apartamento VARCHAR(50) NOT NULL,
ciudad VARCHAR(100) NOT NULL,
tipo_edificio VARCHAR(100) NOT NULL
);

INSERT INTO residents (nombre_residente, apartamento, ciudad, tipo_edificio)
VALUES
('Juan Pérez', 'Apt 101', 'Bogotá', 'Residencial'),
('Ana Gómez', 'Apt 202', 'Medellín', 'Residencial'),
('Carlos Ruiz', 'Apt 303', 'Bogotá', 'Comercial'),
('Laura Sánchez', 'Apt 404', 'Cali', 'Residencial'),
('Pedro Fernández', 'Apt 505', 'Bogotá', 'Comercial');
