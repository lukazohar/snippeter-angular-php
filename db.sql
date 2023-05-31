-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gostitelj: 127.0.0.1
-- Čas nastanka: 31. maj 2023 ob 23.28
-- Različica strežnika: 10.4.28-MariaDB
-- Različica PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Zbirka podatkov: `snippeter`
--

-- --------------------------------------------------------

--
-- Struktura tabele `sharedsnippets`
--

CREATE TABLE `sharedsnippets` (
  `id` int(11) NOT NULL,
  `snippetId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `dateShared` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Odloži podatke za tabelo `sharedsnippets`
--

INSERT INTO `sharedsnippets` (`id`, `snippetId`, `userId`, `dateShared`) VALUES
(1, 1, 2, '2023-05-31'),
(2, 1, 3, '2023-05-30'),
(3, 5, 2, '2023-05-31');

-- --------------------------------------------------------

--
-- Struktura tabele `snippet`
--

CREATE TABLE `snippet` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `prefix` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `body` text NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Odloži podatke za tabelo `snippet`
--

INSERT INTO `snippet` (`id`, `name`, `prefix`, `description`, `body`, `userId`) VALUES
(1, 'Print to console', 'log', 'Log output to console', 'console.log(\'$1\');\\n\r\n$2', 1),
(2, 'For Loop', 'for', 'For Loop', 'for (var ${index} = 0; ${index} < ${array}.length; ${index}++) {\\n\r\n\\tvar ${element} = ${array}[${index}];\r\n\\t$0\r\n}', 1),
(3, 'Write pdb', 'pdb', 'Write pdb.set_trace() to debug Python scripts', 'import pdb; pdb.set_trace()\r\n$2', 2),
(4, 'Start server', 'ngServe', 'Start Angular Server and reload on change', 'ng serve --open --watch', 3),
(5, 'Build server', 'ngBuild', 'Build Angular Server and reload on change', 'ng build --watch', 3);

-- --------------------------------------------------------

--
-- Struktura tabele `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Odloži podatke za tabelo `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `username`, `email`, `password`) VALUES
(1, 'Luka', 'Žohar', 'akul', 'luka.zohi@gmail.com', 'luka.zohi@gmail.com'),
(2, 'Lara', 'Žohar', 'larazohar', 'luka7307@student.uni-lj.si', 'luka7307@student.uni-lj.si'),
(3, 'Random', 'User', 'admin', 'admin@admin.com', 'admin@admin.com');

--
-- Indeksi zavrženih tabel
--

--
-- Indeksi tabele `sharedsnippets`
--
ALTER TABLE `sharedsnippets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `snippetId` (`snippetId`),
  ADD KEY `userId` (`userId`);

--
-- Indeksi tabele `snippet`
--
ALTER TABLE `snippet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `snippet_ibfk_1` (`userId`);

--
-- Indeksi tabele `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT zavrženih tabel
--

--
-- AUTO_INCREMENT tabele `sharedsnippets`
--
ALTER TABLE `sharedsnippets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT tabele `snippet`
--
ALTER TABLE `snippet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT tabele `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Omejitve tabel za povzetek stanja
--

--
-- Omejitve za tabelo `sharedsnippets`
--
ALTER TABLE `sharedsnippets`
  ADD CONSTRAINT `sharedsnippets_ibfk_1` FOREIGN KEY (`snippetId`) REFERENCES `snippet` (`id`),
  ADD CONSTRAINT `sharedsnippets_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Omejitve za tabelo `snippet`
--
ALTER TABLE `snippet`
  ADD CONSTRAINT `snippet_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
