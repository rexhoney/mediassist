-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2021 at 11:53 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `maindata`
--

-- --------------------------------------------------------

--
-- Table structure for table `medecines`
--

CREATE TABLE `medecines` (
  `rid` int(11) NOT NULL,
  `email` varchar(25) NOT NULL,
  `city` varchar(20) NOT NULL,
  `medname` varchar(20) NOT NULL,
  `company` varchar(20) NOT NULL,
  `expdate` date NOT NULL,
  `unit` varchar(20) NOT NULL,
  `qty` int(2) NOT NULL,
  `picname` varchar(30) NOT NULL,
  `doa` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medecines`
--

INSERT INTO `medecines` (`rid`, `email`, `city`, `medname`, `company`, `expdate`, `unit`, `qty`, `picname`, `doa`, `status`) VALUES
(27, 'w@s.c', 'Sangroor', 'Sanitizer', 'lifeboy', '2021-07-30', 'Bottle', 5, 'sanitizer.jpg', '2021-06-30', 'Donated'),
(28, 'r@h.c', 'Bathinda', 'Sanitizer', 'Dettol', '2021-07-24', 'Bottle', 4, 'sanitizer3.jpg', '2021-06-30', 'Available'),
(29, 'b@c.c', 'Bathinda', 'Sanitizer', 'Persona', '2021-07-09', 'Select', 6, 'sanitizer2.jpg', '2021-06-30', 'Donated'),
(30, 'b@c.c', 'Bathinda', 'Fever', 'Abc', '2021-07-01', 'Tablets', 2, 'provide med.jpg', '2021-06-30', 'Available'),
(31, 'a@b.c', 'Faridkot', 'Fever', 'Crocin', '2021-08-06', 'Tablets', 5, 'fever.jpg', '2021-07-02', 'Available'),
(32, 'b@c.c', 'Bathinda', 'Handiplast', 'Handiplast', '2021-07-23', 'Strips', 5, 'handiplast.jpg', '2021-07-03', 'Donated'),
(33, 'b@c.c', 'Bathinda', 'Handiplast', 'Handiplast', '2021-07-18', 'Strips', 4, 'handiplast.jpg', '2021-07-05', 'Available'),
(34, 'a@b.c', 'Faridkot', 'Handiplast', 'Handiplast', '2021-07-22', 'Strips', 5, 'handiplast.jpg', '2021-07-05', 'Available'),
(35, 'r@h.c', 'Bathinda', 'Sanitizer', 'Lifeboy', '2021-07-23', 'Tablets', 5, 'sanitizer.jpg', '2021-07-09', 'Available'),
(36, 'r@h.c', 'Bathinda', 'Sanitizer', 'Persona', '2021-07-22', 'Bottle', 3, 'sanitizer2.jpg', '2021-07-09', 'Available'),
(37, 'a@a.c', 'Bathinda', 'Painkiller', 'amll', '2021-08-05', 'Tablets', 5, 'medicine background.jpg', '2021-07-09', 'Available');

-- --------------------------------------------------------

--
-- Table structure for table `needy`
--

CREATE TABLE `needy` (
  `email` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `aadhar` varchar(14) NOT NULL,
  `city` varchar(20) NOT NULL,
  `address` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `needy`
--

INSERT INTO `needy` (`email`, `name`, `aadhar`, `city`, `address`) VALUES
('n@n.a', 'Ram', '25265356892222', 'Bathinda', 'Railway');

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `email` varchar(25) NOT NULL,
  `name` varchar(30) NOT NULL,
  `contact` varchar(10) NOT NULL,
  `city` varchar(20) NOT NULL,
  `address` varchar(80) NOT NULL,
  `acard` varchar(16) NOT NULL,
  `picname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`email`, `name`, `contact`, `city`, `address`, `acard`, `picname`) VALUES
('a@a.c', 'Kulwinder', '9875625425', 'Bathinda', 'Model town', '11111111111111', 'IMG-20170219-WA0006.jpg'),
('a@b.c', 'Will', '9865236254', 'Faridkot', 'model town', '23652521455552', 'person5.jpg'),
('b@c.c', 'Stark', '9845875874', 'Bathinda', 'Paras ram nagar', '11111111111111', 'person.jpg'),
('n@n.c', 'Sonia', '8756562542', 'Patiala', 'Moti Nagar', '12365236523652', 'person3.jpg'),
('r@h.c', 'Rock', '9865425634', 'Bathinda', 'Bharat Nagar', '12365425895465', 'person2.jpg'),
('w@s.c', 'Rashmika', '9862354526', 'Sangroor', 'Patel Nagar', '54268457951265', 'person4.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(20) NOT NULL,
  `pwd` varchar(25) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `utype` varchar(12) NOT NULL,
  `dos` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `pwd`, `mobile`, `utype`, `dos`) VALUES
('a@a.c', 'a', '9865236523', 'Med Provider', '2021-07-09'),
('a@b.c', 'a', '8965452153', 'Med Provider', '2021-06-30'),
('b@c.c', 'a', '9999999999', 'Med Provider', '14/6/2021'),
('n@n.a', 'a', '9865265425', 'Needy', '2021-06-30'),
('r@h.c', 'hhh', '9999999999', 'Med Provider', '2021-06-20'),
('w@s.c', 'sss', '9790193563', 'Med Provider', '2021-06-19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `medecines`
--
ALTER TABLE `medecines`
  ADD PRIMARY KEY (`rid`);

--
-- Indexes for table `needy`
--
ALTER TABLE `needy`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `medecines`
--
ALTER TABLE `medecines`
  MODIFY `rid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
