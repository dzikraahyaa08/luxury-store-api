-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 11, 2026 at 04:03 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `barang_branded`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `brand_id` int(11) NOT NULL,
  `brand_name` varchar(100) NOT NULL,
  `origin_country` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`brand_id`, `brand_name`, `origin_country`) VALUES
(1, 'Louis Vuitton', 'France/Italy'),
(2, 'Gucci', 'Italy'),
(3, 'Rolex', 'Switzerland'),
(4, 'Chanel', 'France'),
(5, 'Herm?s', 'France'),
(6, 'Prada', 'Italy'),
(7, 'Dior', 'France'),
(8, 'Balenciaga', 'Spain'),
(9, 'Armani', 'Italy'),
(10, 'Versace', 'Italy');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_amount` decimal(15,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `order_date`, `total_amount`) VALUES
(1, 1, '2026-05-08 16:30:10', 649000000.00),
(2, 2, '2026-05-08 16:30:10', 35000000.00),
(3, 3, '2026-05-08 16:30:10', 12500000.00),
(4, 4, '2026-05-08 16:30:10', 210000000.00),
(5, 5, '2026-05-08 16:30:10', 90000000.00),
(6, 6, '2026-05-08 16:30:10', 17000000.00),
(7, 7, '2026-05-08 16:30:10', 45000000.00),
(8, 8, '2026-05-08 16:30:10', 480000000.00),
(9, 9, '2026-05-08 16:30:10', 6000000.00),
(10, 10, '2026-05-08 16:42:25', 15000000.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `item_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `subtotal` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`item_id`, `order_id`, `product_id`, `quantity`, `subtotal`) VALUES
(1, 1, 9, 2, 1300000000.00),
(2, 2, 1, 1, 35000000.00),
(3, 3, 14, 1, 12500000.00),
(4, 4, 7, 1, 210000000.00),
(5, 5, 11, 1, 90000000.00),
(6, 6, 22, 1, 17000000.00),
(7, 7, 16, 1, 45000000.00),
(8, 8, 13, 1, 480000000.00),
(17, 9, 5, 1, 50000000.00),
(18, 10, 12, 1, 75000000.00);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `model_year` year(4) DEFAULT NULL,
  `price` decimal(15,2) NOT NULL,
  `stock` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `brand_id`, `name`, `model_year`, `price`, `stock`) VALUES
(1, 1, 'LV Neverfull MM', '2023', 35000000.00, 5),
(2, 1, 'LV Keepall 50', '2023', 42000000.00, 3),
(3, 1, 'LV Christopher Backpack', '2024', 60000000.00, 2),
(4, 2, 'Gucci Marmont Bag', '2024', 28000000.00, 6),
(5, 2, 'Gucci Ace Sneakers', '2023', 12000000.00, 10),
(6, 2, 'Gucci Dionysus Shoulder', '2024', 34000000.00, 4),
(7, 3, 'Rolex Submariner', '2023', 210000000.00, 2),
(8, 3, 'Rolex Datejust 41', '2024', 175000000.00, 3),
(9, 3, 'Rolex Daytona Gold', '2024', 700000000.00, 1),
(10, 4, 'Chanel Classic Flap', '2024', 155000000.00, 2),
(11, 4, 'Chanel Tweed Jacket', '2023', 90000000.00, 3),
(12, 4, 'Chanel Boy Bag', '2024', 110000000.00, 2),
(13, 5, 'Hermes Birkin 25', '2023', 480000000.00, 1),
(14, 5, 'Hermes Oran Sandals', '2024', 12500000.00, 15),
(15, 5, 'Hermes Kelly 28', '2024', 390000000.00, 1),
(16, 6, 'Prada Galleria Bag', '2023', 45000000.00, 5),
(17, 6, 'Prada Re-Edition 2005', '2024', 28000000.00, 8),
(18, 6, 'Prada Bucket Hat', '2023', 9500000.00, 20),
(19, 7, 'Lady Dior Bag', '2024', 98000000.00, 3),
(20, 7, 'Dior Saddle Bag', '2023', 65000000.00, 5),
(21, 7, 'Dior Book Tote', '2024', 52000000.00, 6),
(22, 8, 'Balenciaga Triple S', '2023', 17000000.00, 12),
(23, 8, 'Balenciaga Speed Trainer', '2023', 14000000.00, 10),
(24, 8, 'Balenciaga Hourglass Bag', '2024', 40000000.00, 4),
(25, 9, 'Armani Velvet Suit', '2023', 55000000.00, 3),
(26, 9, 'Armani Silk Dress', '2024', 38000000.00, 5),
(27, 9, 'Armani Leather Jacket', '2023', 42000000.00, 2),
(28, 10, 'Versace Medusa Shades', '2024', 6000000.00, 15),
(29, 10, 'Versace Silk Shirt', '2023', 18000000.00, 8),
(30, 10, 'Versace Chain Reaction', '2023', 15000000.00, 7);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `membership_level` enum('Silver','Gold','Platinum') DEFAULT 'Silver',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `membership_level`, `created_at`) VALUES
(1, 'sultan_jakarta', 'sultan@mail.com', 'Platinum', '2026-05-08 16:29:34'),
(2, 'budi_luxury', 'budi@mail.com', 'Platinum', '2026-05-08 16:29:34'),
(3, 'ani_fashion', 'ani@mail.com', 'Silver', '2026-05-08 16:29:34'),
(4, 'rudi_collector', 'rudi@mail.com', 'Platinum', '2026-05-08 16:29:34'),
(5, 'siti_mewah', 'siti@mail.com', 'Gold', '2026-05-08 16:29:34'),
(6, 'agus_branded', 'agus@mail.com', 'Silver', '2026-05-08 16:29:34'),
(7, 'lina_chic', 'lina@mail.com', 'Gold', '2026-05-08 16:29:34'),
(8, 'dono_rich', 'dono@mail.com', 'Platinum', '2026-05-08 16:29:34'),
(9, 'wati_style', 'wati@mail.com', 'Silver', '2026-05-08 16:29:34'),
(10, 'eka_glam', 'eka@mail.com', 'Gold', '2026-05-08 16:42:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `brand_id` (`brand_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
