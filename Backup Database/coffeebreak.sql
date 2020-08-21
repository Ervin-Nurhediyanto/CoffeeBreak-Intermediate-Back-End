-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 10 Agu 2020 pada 17.00
-- Versi server: 10.4.10-MariaDB
-- Versi PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coffeebreak`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `nameCategory` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id`, `nameCategory`) VALUES
(1, 'Drink'),
(2, 'Food');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `idProduct` int(11) NOT NULL,
  `countItem` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`id`, `idProduct`, `countItem`, `date`) VALUES
(1, 9, 1, '2020-07-01'),
(2, 8, 2, '2020-07-02'),
(3, 7, 3, '2020-07-03'),
(4, 6, 4, '2020-07-04'),
(5, 5, 5, '2020-07-05'),
(6, 4, 6, '2020-07-06'),
(7, 3, 7, '2020-07-07'),
(8, 2, 8, '2020-07-08'),
(9, 1, 9, '2020-07-09'),
(10, 9, 2, '2020-07-10'),
(11, 8, 3, '2020-07-11'),
(12, 7, 4, '2020-07-12'),
(13, 6, 5, '2020-07-13'),
(14, 7, 2, '2020-07-14'),
(15, 1, 3, '2020-07-15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `image` text NOT NULL,
  `price` int(11) NOT NULL,
  `idCategory` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`id`, `name`, `image`, `price`, `idCategory`) VALUES
(1, 'Espresso', 'https://github.com/Ervin-Nurhediyanto/CoffeeBreak-Cafe-App/blob/master/asset/menu/Espresso.jpg', 10000, 1),
(2, 'Cofee Latte', 'https://github.com/Ervin-Nurhediyanto/CoffeeBreak-Cafe-App/blob/master/asset/menu/Cofee%20Latte.jpg', 15000, 1),
(3, 'Cappucino', 'https://github.com/Ervin-Nurhediyanto/CoffeeBreak-Cafe-App/blob/master/asset/menu/Cappucino.jpg', 5000, 1),
(4, 'Red Velvet Latte', 'https://github.com/Ervin-Nurhediyanto/CoffeeBreak-Cafe-App/blob/master/asset/menu/Red%20Velvet%20Latte.jpg', 33000, 1),
(5, 'Choco Rhum', 'https://github.com/Ervin-Nurhediyanto/CoffeeBreak-Cafe-App/blob/master/asset/menu/Choco%20Rhum.jpg', 28000, 2),
(6, 'Black Forest', 'https://github.com/Ervin-Nurhediyanto/CoffeeBreak-Cafe-App/blob/master/asset/menu/Black%20Forest.jpg', 30000, 2),
(7, 'Chicken Katsu Dabu-dabu', 'https://github.com/Ervin-Nurhediyanto/CoffeeBreak-Cafe-App/blob/master/asset/menu/Chicken%20Katsu%20Dabu-dabu.jpg', 60000, 2),
(8, 'Salmon Truffle Teriyaki', 'https://github.com/Ervin-Nurhediyanto/CoffeeBreak-Cafe-App/blob/master/asset/menu/Salmon%20Truffle%20Teriyaki.jpg', 60000, 2),
(9, 'Wiener Schnitzel', 'https://github.com/Ervin-Nurhediyanto/CoffeeBreak-Cafe-App/blob/master/asset/menu/Wiener%20Schnitzel.jpg', 69000, 2);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
