CREATE DATABASE `lab4grupal`;
USE `lab4grupal`;

CREATE TABLE `empresa` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `denominacion` VARCHAR(128) NOT NULL,
    `telefono` VARCHAR(50) NOT NULL,
    `horarioAtencion` VARCHAR(256) NOT NULL,
    `quienesSomos` VARCHAR(1024) NOT NULL,
    `latitud` DECIMAL NOT NULL,
    `longitud` DECIMAL NOT NULL,
    `domicilio` VARCHAR(256) NOT NULL,
    `email` VARCHAR(75) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `noticia` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(128) NOT NULL,
    `resumen` VARCHAR(1024) NOT NULL,
    `imagen` VARCHAR(128) NOT NULL,
    `contenidoHTML` TEXT NOT NULL,
    `publicada` CHAR(1) NOT NULL,
    `fechaPublicacion` DATE NOT NULL,
    `idEmpresa` INT NOT NULL,
    FOREIGN KEY (`idEmpresa`) REFERENCES `empresa`(`id`),
    PRIMARY KEY (`id`)
);
