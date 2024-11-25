-- creacion de base de datos
create database db_agro;
use db_agro;

-- creacion de tablas
create table tb_fundo(
	codigo_fundo char(8) primary key not null,
    nombre_fundo varchar(255) not null,
    hectarea float not null,
    estado boolean not null default true
);

create table tb_sector(
	codigo_sector char(8) primary key not null,
    nombre_sector varchar(255) not null,
    hectarea float not null,
    cultivado enum('Baldío','Cultivado'),
    estado boolean not null default true,
    sector_codigo_fundo char(8) not null,
    foreign key (sector_codigo_fundo) references tb_fundo(codigo_fundo)
);

create table tb_planta(
	codigo_planta char(8) primary key not null,
    codigo_qr varchar(255) not null,
    tamaño enum('Grande','Mediano','Pequeño'),
    fecha_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    fecha_siembra datetime,
    estado boolean not null default true,
    planta_codigo_sector char(8) not null,
    foreign key (planta_codigo_sector) references tb_sector(codigo_sector)
);

insert into tb_fundo(codigo_fundo, nombre_fundo, area) values
	('F00001', 'Scorpius 1', 40),
    ('F00002', 'Scorpius 2', 38);

insert into tb_sector(codigo_sector, nombre_sector, area, cultivado, sector_codigo_fundo) values
	('S00001', 'A', 10, 'Cultivado','F00001');
