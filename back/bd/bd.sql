CREATE DATABASE  IF NOT EXISTS `db_agro` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `db_agro`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: db_agro
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_fruto`
--

DROP TABLE IF EXISTS `tb_fruto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_fruto` (
  `codigo_fruto` int(11) NOT NULL AUTO_INCREMENT,
  `tamaño_fruto` varchar(25) DEFAULT NULL,
  `fruto_codigo_planta` char(8) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`codigo_fruto`),
  KEY `fruto_codigo_planta` (`fruto_codigo_planta`),
  CONSTRAINT `tb_fruto_ibfk_1` FOREIGN KEY (`fruto_codigo_planta`) REFERENCES `tb_planta` (`codigo_planta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_fruto`
--

LOCK TABLES `tb_fruto` WRITE;
/*!40000 ALTER TABLE `tb_fruto` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_fruto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_fundo`
--

DROP TABLE IF EXISTS `tb_fundo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_fundo` (
  `codigo_fundo` char(8) NOT NULL,
  `nombre_fundo` varchar(255) NOT NULL,
  `hectarea` float NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`codigo_fundo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_fundo`
--

LOCK TABLES `tb_fundo` WRITE;
/*!40000 ALTER TABLE `tb_fundo` DISABLE KEYS */;
INSERT INTO `tb_fundo` VALUES ('F00001','Scorpius 1',40,1),('F00002','Scorpius 2',38,1);
/*!40000 ALTER TABLE `tb_fundo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_mantenimiento`
--

DROP TABLE IF EXISTS `tb_mantenimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_mantenimiento` (
  `codigo_mantenimiento` int(11) NOT NULL AUTO_INCREMENT,
  `mantenimiento` varchar(255) DEFAULT NULL,
  `fecha_mantenimiento` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `mantenimiento_codigo_planta` char(8) NOT NULL,
  PRIMARY KEY (`codigo_mantenimiento`),
  KEY `mantenimiento_codigo_planta` (`mantenimiento_codigo_planta`),
  CONSTRAINT `tb_mantenimiento_ibfk_1` FOREIGN KEY (`mantenimiento_codigo_planta`) REFERENCES `tb_planta` (`codigo_planta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_mantenimiento`
--

LOCK TABLES `tb_mantenimiento` WRITE;
/*!40000 ALTER TABLE `tb_mantenimiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_mantenimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_planta`
--

DROP TABLE IF EXISTS `tb_planta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_planta` (
  `codigo_planta` char(8) NOT NULL,
  `codigo_qr` varchar(255) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `planta_codigo_sector` char(8) NOT NULL,
  PRIMARY KEY (`codigo_planta`),
  KEY `planta_codigo_sector` (`planta_codigo_sector`),
  CONSTRAINT `tb_planta_ibfk_1` FOREIGN KEY (`planta_codigo_sector`) REFERENCES `tb_sector` (`codigo_sector`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `tb_planta` WRITE;
/*!40000 ALTER TABLE `tb_planta` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_planta` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `tb_sector`
--

DROP TABLE IF EXISTS `tb_sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_sector` (
  `codigo_sector` char(8) NOT NULL,
  `nombre_sector` varchar(255) NOT NULL,
  `hectarea` float NOT NULL,
  `cultivado` enum('Baldío','Cultivado') DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `sector_codigo_fundo` char(8) NOT NULL,
  PRIMARY KEY (`codigo_sector`),
  KEY `sector_codigo_fundo` (`sector_codigo_fundo`),
  CONSTRAINT `tb_sector_ibfk_1` FOREIGN KEY (`sector_codigo_fundo`) REFERENCES `tb_fundo` (`codigo_fundo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_sector`
--

LOCK TABLES `tb_sector` WRITE;
/*!40000 ALTER TABLE `tb_sector` DISABLE KEYS */;
INSERT INTO `tb_sector` VALUES ('S00001','A',10,'Cultivado',1,'F00001'),('S00002','B',10,'Cultivado',1,'F00001'),('S00003','C',10,'Cultivado',1,'F00001'),('S0000a','D',10,'Baldío',1,'F00001');
/*!40000 ALTER TABLE `tb_sector` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-30  9:22:16
