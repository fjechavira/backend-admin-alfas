-- Database: adminalfas
DROP DATABASE adminalfas;

CREATE DATABASE adminalfas
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'es_MX.UTF-8'
    LC_CTYPE = 'es_MX.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Table: usuario
DROP TABLE IF EXISTS "public"."usuario";

CREATE SCHEMA IF NOT EXISTS "public";

CREATE TABLE IF NOT EXISTS "public"."usuario"
(
 "idusuario"         varchar(50) NOT NULL,
 "correo"            varchar(50) NOT NULL,
 "password"          varchar(100) NOT NULL,
 "fechacreacion"     timestamp default current_timestamp NOT NULL,
 "fechamodificacion" timestamp default current_timestamp NOT NULL,
 "activo"            boolean NOT NULL,
 "row_id"            int NOT NULL GENERATED ALWAYS AS IDENTITY,
 CONSTRAINT "PK_usuario" PRIMARY KEY ( "idusuario", "correo" )
);







