SHOW DATABASES;
-- CREAR BASE DE DATOS
CREATE DATABASE db_clothstore;
USE db_clothstore;
SHOW TABLES;
-- DELETE TABLES
DROP TABLE cliente;
DROP TABLE producto;
DROP TABLE cotizacion;
DROP TABLE detalle_cotizacion;
-- TABLA CLIENTE
CREATE TABLE IF NOT EXISTS cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    razon VARCHAR(255) NOT NULL,
    ruc INT NOT NULL UNIQUE NULL,
    direccion TEXT,
    telefono TEXT,
    correo VARCHAR(255)
);
-- TABLA PRODUCTO
CREATE TABLE IF NOT EXISTS producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imagen TEXT,
    deporte VARCHAR(255),
    modelo VARCHAR(255),
    sexo VARCHAR(255),
    tela VARCHAR(255),
    talla VARCHAR(255),
    costo_t DOUBLE,
    costo_a DOUBLE,
    descripcion TEXT
);
-- TABLA COTIZACIÓN
CREATE TABLE IF NOT EXISTS cotizacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    fecha_creada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    soles DOUBLE NOT NULL,
    dolares DOUBLE NULL,
    pesos DOUBLE NULL,
    CONSTRAINT fk_cliente FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);
-- TABLA DETALLE COTIZACIÓN
CREATE TABLE IF NOT EXISTS detalle_cotizacion (
	id INT AUTO_INCREMENT PRIMARY KEY,
    id_cotizacion INT,
    id_producto INT,
    cantidad INT,
    CONSTRAINT fk_cotizacion FOREIGN KEY (id_cotizacion) REFERENCES cotizacion(id),
    CONSTRAINT fk_producto FOREIGN KEY (id_producto) REFERENCES producto(id)
);
-- VISTA COTIZACION
CREATE OR REPLACE VIEW vista_cotizacion
AS
SELECT 
	ct.id, ct.id_cliente, 
    ct.fecha_creada, ct.fecha_modificado,
    ct.soles, ct.dolares, ct.pesos,
    CONCAT(cl.nombre, ' ', cl.apellido) as nombre
FROM cotizacion ct
INNER JOIN cliente cl ON ct.id_cliente = cl.id;
-- VISTA COTIZACION
CREATE OR REPLACE VIEW vista_detalle_cotizacion
AS
SELECT 
	dc.id, dc.id_cotizacion, dc.cantidad, dc.id_producto,
    p.imagen, p.descripcion, p.talla, p.costo_t, p.costo_a, p.costo_t * dc.cantidad as subtotal
FROM detalle_cotizacion dc
INNER JOIN producto p ON dc.id_producto = p.id;
-- SELECT
SELECT * FROM cliente;
SELECT * FROM producto;
SELECT * FROM cotizacion;
SELECT * FROM detalle_cotizacion;

SELECT * FROM vista_cotizacion where id = 2;
SELECT * FROM vista_detalle_cotizacion WHERE id_cotizacion = 2;

SELECT 
	ct.id, ct.id_cliente, 
    ct.fecha_creada, ct.fecha_modificado,
    ct.soles, ct.dolares, ct.pesos,
    CONCAT(cl.nombre, ' ', cl.apellido) as nombre,
    dt.subtotal
FROM cotizacion ct
INNER JOIN cliente cl ON ct.id_cliente = cl.id
INNER JOIN vista_detalle_cotizacion dt ON ct.id = dt.id_cotizacion;

SELECT 
	ct.id, ct.id_cliente, 
    ct.fecha_creada, ct.fecha_modificado,
    ct.soles, ct.dolares, ct.pesos,
    CONCAT(cl.nombre, ' ', cl.apellido) as nombre,
    SUM(dt.subtotal)
FROM cotizacion ct
INNER JOIN cliente cl ON ct.id_cliente = cl.id
INNER JOIN vista_detalle_cotizacion dt ON ct.id = dt.id_cotizacion
WHERE ct.id = 2
GROUP BY ct.id, ct.fecha_creada, ct.fecha_modificado, ct.soles, ct.dolares, ct.pesos;

SELECT @@version;