-- phpMyAdmin SQL Dump
-- version 3.5.8
-- http://www.phpmyadmin.net
--
-- Máquina: localhost
-- Data de Criação: 20-Nov-2013 às 12:15
-- Versão do servidor: 5.5.34-0ubuntu0.12.10.1
-- versão do PHP: 5.4.6-1ubuntu1.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de Dados: `web2`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--

CREATE TABLE IF NOT EXISTS `categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedido`
--

CREATE TABLE IF NOT EXISTS `pedido` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `pedido_status_id` int(11) NOT NULL,
  `data_ini` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pedido_FKIndex1` (`pedido_status_id`),
  KEY `pedido_FKIndex2` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedido_has_produto`
--

CREATE TABLE IF NOT EXISTS `pedido_has_produto` (
  `pedido_id` int(11) NOT NULL,
  `produto_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`pedido_id`,`produto_id`),
  KEY `cesto_has_produto_FKIndex1` (`pedido_id`),
  KEY `cesto_has_produto_FKIndex2` (`produto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedido_status`
--

CREATE TABLE IF NOT EXISTS `pedido_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_status` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

CREATE TABLE IF NOT EXISTS `produto` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `categoria_id` int(11) NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `preco` float DEFAULT NULL,
  `tempo` int(2) DEFAULT NULL,
  `imagem` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `produto_FKIndex1` (`categoria_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_tipo_id` int(11) unsigned NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `endereco` varchar(120) DEFAULT NULL,
  `sexo` varchar(9) DEFAULT NULL,
  `telefone` varchar(15) DEFAULT NULL,
  `cpf` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL,
  `data_nasc` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_FKIndex1` (`usuario_tipo_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `usuario_tipo_id`, `nome`, `endereco`, `sexo`, `telefone`, `cpf`, `email`, `senha`, `data_nasc`) VALUES
(2, 1, 'Guilherme Budnieswski', 'Rua Abc, 123', 'Masculino', '(41) 9806-9374', 2147483647, 'guiiski@gmail.com', '005924d6ed93e84fd8c66ee4860056ad', '1993-09-11');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario_tipo`
--

CREATE TABLE IF NOT EXISTS `usuario_tipo` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(30) DEFAULT NULL,
  `abreviacao` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Extraindo dados da tabela `usuario_tipo`
--

INSERT INTO `usuario_tipo` (`id`, `nome`, `abreviacao`) VALUES
(1, 'Administrador', 'admin'),
(2, 'Cliente', 'cliente'),
(3, 'Funcionario', 'func');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
