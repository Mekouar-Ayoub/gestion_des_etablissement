-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 14 oct. 2023 à 14:24
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dbs12130124`
--

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(150) NOT NULL,
  `prenom` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `type` varchar(150) NOT NULL DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`id`, `nom`, `prenom`, `email`, `password`, `type`, `created_at`, `updated_at`) VALUES
(1, 'Meryem', 'El Maddarsi', 'Bluesymphony.piano@gmail.com', '$2y$10$96MRO0jcrEuvGLHva516XOLlPSRGOl6b1qLU2jaa3sNJ2gbuKTnWS', 'admin', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

CREATE TABLE `commentaires` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `membre_id` bigint(20) UNSIGNED NOT NULL,
  `publication_id` bigint(20) UNSIGNED NOT NULL,
  `comment` varchar(150) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `compte_ecole`
--

CREATE TABLE `compte_ecole` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `solde` double(8,2) NOT NULL DEFAULT 0.00,
  `mouvement` double(8,2) NOT NULL,
  `cour_id` int(11) NOT NULL DEFAULT -1,
  `prof_id` int(11) NOT NULL DEFAULT -1,
  `eleve_id` int(11) NOT NULL DEFAULT -1,
  `profit` double(8,2) NOT NULL,
  `type_de_paiement` varchar(150) NOT NULL,
  `type` varchar(150) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `compte_ecole`
--

INSERT INTO `compte_ecole` (`id`, `solde`, `mouvement`, `cour_id`, `prof_id`, `eleve_id`, `profit`, `type_de_paiement`, `type`, `created_at`, `updated_at`) VALUES
(1, 800.00, 800.00, -1, -1, 4, 0.00, 'solde initial', 'l\'eleve a été créer', '2023-10-12 16:16:28', '2023-10-12 16:16:28'),
(2, 300.00, -500.00, -1, 1, -1, 0.00, 'solde initial', 'le professeur a été créer', '2023-10-12 16:18:03', '2023-10-12 16:18:03'),
(3, 100.00, -200.00, -1, 1, -1, 0.00, 'Chèque', 'le professeur a été payé', '2023-10-12 16:31:13', '2023-10-12 16:31:13'),
(4, 0.00, -100.00, -1, 1, -1, 0.00, 'Virement', 'le professeur a été payé', '2023-10-12 16:32:23', '2023-10-12 16:32:23'),
(5, -100.00, -100.00, -1, 1, -1, 0.00, 'Chèque', 'le professeur a été payé', '2023-10-12 16:33:19', '2023-10-12 16:33:19'),
(6, -150.00, -50.00, -1, 1, -1, 0.00, 'Espece', 'le professeur a été payé', '2023-10-12 16:33:34', '2023-10-12 16:33:34'),
(7, -175.00, -25.00, -1, 1, -1, 0.00, 'Chèque', 'le professeur a été payé', '2023-10-12 16:34:12', '2023-10-12 16:34:12'),
(8, -176.00, -1.00, -1, 1, -1, 0.00, 'Chèque', 'le professeur a été payé', '2023-10-12 16:34:39', '2023-10-12 16:34:39'),
(9, -676.00, -500.00, -1, -1, 1, 0.00, 'Espece', 'l\'eleve a payé', '2023-10-12 16:37:59', '2023-10-12 16:37:59'),
(10, -776.00, -100.00, -1, -1, 1, 0.00, 'Espece', 'l\'eleve a payé', '2023-10-12 16:39:09', '2023-10-12 16:39:09'),
(11, -876.00, -100.00, -1, -1, 1, 0.00, 'Espece', 'l\'eleve a payé', '2023-10-12 16:39:20', '2023-10-12 16:39:20');

-- --------------------------------------------------------

--
-- Structure de la table `compte_eleve`
--

CREATE TABLE `compte_eleve` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `eleve_id` bigint(20) UNSIGNED NOT NULL,
  `cour_id` int(11) NOT NULL,
  `nombre_heures` int(11) NOT NULL,
  `type_de_paiement` varchar(150) NOT NULL,
  `prix` double(8,2) NOT NULL,
  `type` varchar(150) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `compte_eleve`
--

INSERT INTO `compte_eleve` (`id`, `eleve_id`, `cour_id`, `nombre_heures`, `type_de_paiement`, `prix`, `type`, `created_at`, `updated_at`) VALUES
(4, 1, -1, 0, 'Espece', 500.00, 'l\'eleve a payé', '2023-10-12 16:37:59', '2023-10-12 16:37:59'),
(5, 1, -1, 0, 'Espece', 100.00, 'l\'eleve a payé', '2023-10-12 16:39:08', '2023-10-12 16:39:08'),
(6, 1, -1, 0, 'Espece', 100.00, 'l\'eleve a payé', '2023-10-12 16:39:20', '2023-10-12 16:39:20');

-- --------------------------------------------------------

--
-- Structure de la table `compte_prof`
--

CREATE TABLE `compte_prof` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `prof_id` bigint(20) UNSIGNED NOT NULL,
  `coure_id` int(11) NOT NULL,
  `nombre_heures` int(11) NOT NULL,
  `prix_a_rendre` double(8,2) NOT NULL,
  `type_de_paiement` varchar(150) NOT NULL,
  `profit` double(8,2) NOT NULL,
  `type` varchar(150) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `compte_prof`
--

INSERT INTO `compte_prof` (`id`, `prof_id`, `coure_id`, `nombre_heures`, `prix_a_rendre`, `type_de_paiement`, `profit`, `type`, `created_at`, `updated_at`) VALUES
(1, 1, -1, 0, 500.00, 'solde initial', 0.00, 'le professeur a été créer', '2023-10-12 16:18:03', '2023-10-12 16:18:03'),
(2, 1, -1, 0, -200.00, 'Chèque', 0.00, 'le professeur a été payé', '2023-10-12 16:31:13', '2023-10-12 16:31:13'),
(3, 1, -1, 0, -100.00, 'Virement', 0.00, 'le professeur a été payé', '2023-10-12 16:32:23', '2023-10-12 16:32:23'),
(4, 1, -1, 0, -100.00, 'Chèque', 0.00, 'le professeur a été payé', '2023-10-12 16:33:19', '2023-10-12 16:33:19'),
(5, 1, -1, 0, -50.00, 'Espece', 0.00, 'le professeur a été payé', '2023-10-12 16:33:33', '2023-10-12 16:33:33'),
(6, 1, -1, 0, -25.00, 'Chèque', 0.00, 'le professeur a été payé', '2023-10-12 16:34:11', '2023-10-12 16:34:11'),
(7, 1, -1, 0, -1.00, 'Chèque', 0.00, 'le professeur a été payé', '2023-10-12 16:34:39', '2023-10-12 16:34:39');

-- --------------------------------------------------------

--
-- Structure de la table `coures`
--

CREATE TABLE `coures` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `titre` varchar(150) NOT NULL,
  `prix_horaire` double(8,2) NOT NULL,
  `etat` tinyint(1) NOT NULL DEFAULT 0,
  `debut_de_coure` datetime NOT NULL,
  `fin_de_coure` datetime NOT NULL,
  `profe_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `individuel` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `coures`
--

INSERT INTO `coures` (`id`, `titre`, `prix_horaire`, `etat`, `debut_de_coure`, `fin_de_coure`, `profe_id`, `created_at`, `updated_at`, `individuel`) VALUES
(152, 'Solfege', 150.00, 0, '2023-10-14 09:00:00', '2023-10-14 10:00:00', 1, '2023-10-13 09:12:43', '2023-10-13 09:12:43', 1),
(153, 'Solfege', 150.00, 0, '2023-10-15 15:00:00', '2023-10-15 16:00:00', 1, '2023-10-13 09:12:44', '2023-10-13 09:12:44', 1),
(154, 'Solfege', 150.00, 0, '2023-10-21 09:00:00', '2023-10-21 10:00:00', 1, '2023-10-13 09:12:44', '2023-10-13 09:12:44', 1),
(155, 'Solfege', 150.00, 0, '2023-10-22 15:00:00', '2023-10-22 16:00:00', 1, '2023-10-13 09:12:44', '2023-10-13 09:12:44', 1),
(156, 'Solfege', 150.00, 0, '2023-10-28 09:00:00', '2023-10-28 10:00:00', 1, '2023-10-13 09:12:45', '2023-10-13 09:12:45', 1),
(157, 'Solfege', 150.00, 0, '2023-10-29 16:00:00', '2023-10-29 17:00:00', 1, '2023-10-13 09:12:45', '2023-10-13 09:12:45', 1),
(158, 'Solfege', 150.00, 0, '2023-11-04 09:00:00', '2023-11-04 10:00:00', 1, '2023-10-13 09:12:45', '2023-10-13 09:12:45', 1),
(159, 'Solfege', 150.00, 0, '2023-11-05 15:00:00', '2023-11-05 16:00:00', 1, '2023-10-13 09:12:46', '2023-10-13 09:12:46', 1),
(160, 'Solfege', 150.00, 0, '2023-11-11 09:00:00', '2023-11-11 10:00:00', 1, '2023-10-13 09:12:46', '2023-10-13 09:12:46', 1),
(161, 'Solfege', 150.00, 0, '2023-11-12 15:00:00', '2023-11-12 16:00:00', 1, '2023-10-13 09:12:46', '2023-10-13 09:12:46', 1),
(162, 'Solfege', 150.00, 0, '2023-11-18 09:00:00', '2023-11-18 10:00:00', 1, '2023-10-13 09:12:46', '2023-10-13 09:12:46', 1),
(163, 'Solfege', 150.00, 0, '2023-11-19 15:00:00', '2023-11-19 16:00:00', 1, '2023-10-13 09:12:47', '2023-10-13 09:12:47', 1),
(164, 'Solfege', 150.00, 0, '2023-11-25 09:00:00', '2023-11-25 10:00:00', 1, '2023-10-13 09:12:47', '2023-10-13 09:12:47', 1),
(165, 'Solfege', 150.00, 0, '2023-11-26 15:00:00', '2023-11-26 16:00:00', 1, '2023-10-13 09:12:47', '2023-10-13 09:12:47', 1),
(166, 'Solfege', 150.00, 0, '2023-12-02 09:00:00', '2023-12-02 10:00:00', 1, '2023-10-13 09:12:47', '2023-10-13 09:12:47', 1),
(167, 'Solfege', 150.00, 0, '2023-12-03 15:00:00', '2023-12-03 16:00:00', 1, '2023-10-13 09:12:48', '2023-10-13 09:12:48', 1),
(168, 'Solfege', 150.00, 0, '2023-12-09 09:00:00', '2023-12-09 10:00:00', 1, '2023-10-13 09:12:48', '2023-10-13 09:12:48', 1),
(169, 'Solfege', 150.00, 0, '2023-12-10 15:00:00', '2023-12-10 16:00:00', 1, '2023-10-13 09:12:48', '2023-10-13 09:12:48', 1),
(170, 'Solfege', 150.00, 0, '2023-12-16 09:00:00', '2023-12-16 10:00:00', 1, '2023-10-13 09:12:49', '2023-10-13 09:12:49', 1),
(171, 'Solfege', 150.00, 0, '2023-12-17 15:00:00', '2023-12-17 16:00:00', 1, '2023-10-13 09:12:49', '2023-10-13 09:12:49', 1),
(172, 'Solfege', 150.00, 0, '2023-12-23 09:00:00', '2023-12-23 10:00:00', 1, '2023-10-13 09:12:49', '2023-10-13 09:12:49', 1),
(173, 'Solfege', 150.00, 0, '2023-12-24 15:00:00', '2023-12-24 16:00:00', 1, '2023-10-13 09:12:50', '2023-10-13 09:12:50', 1),
(174, 'Solfege', 150.00, 0, '2023-12-30 09:00:00', '2023-12-30 10:00:00', 1, '2023-10-13 09:12:50', '2023-10-13 09:12:50', 1),
(175, 'Solfege', 150.00, 0, '2023-12-31 15:00:00', '2023-12-31 16:00:00', 1, '2023-10-13 09:12:50', '2023-10-13 09:12:50', 1),
(176, 'Solfege', 150.00, 0, '2024-01-06 09:00:00', '2024-01-06 10:00:00', 1, '2023-10-13 09:12:51', '2023-10-13 09:12:51', 1),
(177, 'Solfege', 150.00, 0, '2024-01-07 15:00:00', '2024-01-07 16:00:00', 1, '2023-10-13 09:12:51', '2023-10-13 09:12:51', 1),
(178, 'Solfege', 150.00, 0, '2024-01-13 09:00:00', '2024-01-13 10:00:00', 1, '2023-10-13 09:12:51', '2023-10-13 09:12:51', 1),
(179, 'Solfege', 150.00, 0, '2024-01-14 15:00:00', '2024-01-14 16:00:00', 1, '2023-10-13 09:12:52', '2023-10-13 09:12:52', 1),
(180, 'Solfege', 150.00, 0, '2024-01-20 09:00:00', '2024-01-20 10:00:00', 1, '2023-10-13 09:12:52', '2023-10-13 09:12:52', 1),
(181, 'Guitare', 40.00, 0, '2023-10-15 12:00:00', '2023-10-15 13:00:00', 1, '2023-10-13 09:15:00', '2023-10-13 09:15:00', 1),
(182, 'Guitare', 40.00, 0, '2023-10-22 12:00:00', '2023-10-22 13:00:00', 1, '2023-10-13 09:15:00', '2023-10-13 09:15:00', 1),
(183, 'Guitare', 40.00, 0, '2023-10-29 13:00:00', '2023-10-29 14:00:00', 1, '2023-10-13 09:15:00', '2023-10-13 09:15:00', 1),
(184, 'Guitare', 40.00, 0, '2023-11-05 12:00:00', '2023-11-05 13:00:00', 1, '2023-10-13 09:15:01', '2023-10-13 09:15:01', 1),
(185, 'Chant', 300.00, 0, '2023-10-14 14:00:00', '2023-10-14 15:00:00', 1, '2023-10-13 09:15:57', '2023-10-13 09:15:57', 1),
(186, 'Chant', 300.00, 0, '2023-10-21 14:00:00', '2023-10-21 15:00:00', 1, '2023-10-13 09:15:58', '2023-10-13 09:15:58', 1),
(187, 'Chant', 300.00, 0, '2023-10-28 14:00:00', '2023-10-28 15:00:00', 1, '2023-10-13 09:15:58', '2023-10-13 09:15:58', 1),
(188, 'Piano', 40.00, 0, '2023-10-15 15:00:00', '2023-10-15 16:00:00', 1, '2023-10-13 09:17:00', '2023-10-13 09:17:00', 1),
(189, 'Piano', 40.00, 0, '2023-10-22 15:00:00', '2023-10-22 16:00:00', 1, '2023-10-13 09:17:00', '2023-10-13 09:17:00', 1),
(190, 'Piano', 40.00, 0, '2023-10-29 16:00:00', '2023-10-29 17:00:00', 1, '2023-10-13 09:17:01', '2023-10-13 09:17:01', 1),
(191, 'Piano', 40.00, 0, '2023-11-05 15:00:00', '2023-11-05 16:00:00', 1, '2023-10-13 09:17:01', '2023-10-13 09:17:01', 1),
(192, 'Piano', 40.00, 0, '2023-11-12 15:00:00', '2023-11-12 16:00:00', 1, '2023-10-13 09:17:01', '2023-10-13 09:17:01', 1),
(193, 'Piano', 40.00, 0, '2023-11-19 15:00:00', '2023-11-19 16:00:00', 1, '2023-10-13 09:17:02', '2023-10-13 09:17:02', 1),
(194, 'Piano', 40.00, 0, '2023-11-26 15:00:00', '2023-11-26 16:00:00', 1, '2023-10-13 09:17:02', '2023-10-13 09:17:02', 1),
(195, 'Piano', 40.00, 0, '2023-12-03 15:00:00', '2023-12-03 16:00:00', 1, '2023-10-13 09:17:02', '2023-10-13 09:17:02', 1),
(196, 'Piano', 40.00, 0, '2023-12-10 15:00:00', '2023-12-10 16:00:00', 1, '2023-10-13 09:17:03', '2023-10-13 09:17:03', 1),
(197, 'Piano', 40.00, 0, '2023-12-17 15:00:00', '2023-12-17 16:00:00', 1, '2023-10-13 09:17:03', '2023-10-13 09:17:03', 1),
(198, 'Piano', 300.00, 0, '2023-10-15 09:00:00', '2023-10-15 12:00:00', 1, '2023-10-13 10:54:50', '2023-10-13 10:54:50', 1),
(199, 'Piano', 300.00, 0, '2023-10-22 09:00:00', '2023-10-22 12:00:00', 1, '2023-10-13 10:54:52', '2023-10-13 10:54:52', 1),
(200, 'Piano', 40.00, 0, '2023-10-17 18:00:00', '2023-10-17 19:00:00', 1, '2023-10-13 11:43:40', '2023-10-13 11:43:40', 1),
(201, 'Piano', 40.00, 0, '2023-10-24 18:00:00', '2023-10-24 19:00:00', 1, '2023-10-13 11:43:41', '2023-10-13 11:43:41', 1),
(202, 'Piano', 40.00, 0, '2023-10-31 18:00:00', '2023-10-31 19:00:00', 1, '2023-10-13 11:43:41', '2023-10-13 11:43:41', 1);

-- --------------------------------------------------------

--
-- Structure de la table `elev_coures`
--

CREATE TABLE `elev_coures` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `membre_id` bigint(20) UNSIGNED NOT NULL,
  `coure_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `elev_coures`
--

INSERT INTO `elev_coures` (`id`, `membre_id`, `coure_id`, `created_at`, `updated_at`) VALUES
(1, 1, 198, '2023-10-13 10:54:53', '2023-10-13 10:54:53'),
(2, 1, 199, '2023-10-13 10:54:54', '2023-10-13 10:54:54'),
(3, 1, 200, '2023-10-13 11:43:42', '2023-10-13 11:43:42'),
(4, 1, 201, '2023-10-13 11:43:42', '2023-10-13 11:43:42'),
(5, 1, 202, '2023-10-13 11:43:42', '2023-10-13 11:43:42');

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `titre` varchar(150) NOT NULL,
  `debut_de_event` datetime NOT NULL,
  `fin_de_event` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `factures`
--

CREATE TABLE `factures` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `membre_id` bigint(20) UNSIGNED NOT NULL,
  `coure_id` bigint(20) UNSIGNED NOT NULL,
  `numbre_hours` int(11) NOT NULL,
  `prix` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `factures_membres`
--

CREATE TABLE `factures_membres` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `membre_id` bigint(20) UNSIGNED NOT NULL,
  `facture_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(150) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `familles`
--

CREATE TABLE `familles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(150) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `familles`
--

INSERT INTO `familles` (`id`, `nom`, `created_at`, `updated_at`) VALUES
(1, 'Berrada', '2023-10-12 15:53:40', '2023-10-12 15:53:40');

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `membre_id` bigint(20) UNSIGNED NOT NULL,
  `publication_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `membres`
--

CREATE TABLE `membres` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(150) NOT NULL,
  `prenom` varchar(150) NOT NULL,
  `tel` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `adresse` varchar(150) NOT NULL,
  `solde` double(8,2) NOT NULL,
  `famille_id` bigint(20) UNSIGNED NOT NULL,
  `etudient` tinyint(1) NOT NULL DEFAULT 0,
  `type` varchar(150) NOT NULL,
  `rol` varchar(150) NOT NULL DEFAULT 'member',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `membres`
--

INSERT INTO `membres` (`id`, `nom`, `prenom`, `tel`, `email`, `password`, `adresse`, `solde`, `famille_id`, `etudient`, `type`, `rol`, `created_at`, `updated_at`) VALUES
(1, 'Berrada', 'Mohammed', '0415216351', 'mb@gmail.com', '$2y$10$./9KwC/hLA9mkB5u9azvNuQ2jMxFiK2QdUfjHD6SdAIaLYvZOuzdC', 'Casablanca', 1500.00, 1, 1, 'enfant', 'member', '2023-10-12 15:59:59', '2023-10-12 16:39:20');

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(150) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_01_02_101929_compte_ecole', 1),
(6, '2023_04_12_095907_create_admins_table', 1),
(7, '2023_05_10_101044_create_familles_table', 1),
(8, '2023_05_15_132457_create_profes_table', 1),
(9, '2023_05_15_140223_create_membres_table', 1),
(10, '2023_05_15_142313_create_coures_table', 1),
(11, '2023_05_15_144033_create_elev_coures_table', 1),
(12, '2023_05_15_150320_create_publications_table', 1),
(13, '2023_05_15_150844_create_likes_table', 1),
(14, '2023_05_15_151353_create_commentaires_table', 1),
(15, '2023_05_16_145324_create_factures_table', 1),
(16, '2023_06_02_101915_create_historique_soldes', 1),
(17, '2023_06_02_102727_historique_soldes_profs', 1),
(18, '2023_06_16_152400_create_factures_membres', 1),
(19, '2024_06_04_220622_create_events_table', 1);

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(150) NOT NULL,
  `token` varchar(150) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(150) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `profes`
--

CREATE TABLE `profes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(150) NOT NULL,
  `prenom` varchar(150) NOT NULL,
  `tel` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `adress` varchar(150) NOT NULL,
  `instrument` varchar(150) NOT NULL,
  `tarif` varchar(150) NOT NULL,
  `solde` varchar(150) NOT NULL,
  `type` varchar(150) NOT NULL DEFAULT 'profe',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `profes`
--

INSERT INTO `profes` (`id`, `nom`, `prenom`, `tel`, `email`, `password`, `adress`, `instrument`, `tarif`, `solde`, `type`, `created_at`, `updated_at`) VALUES
(1, 'Mekouar', 'Ayoub', '+33758394521', 'contact@qalamsoftware.com', '$2y$10$.WI99XFDD8.jVm.F6tvJv.QL0w.rXOfcG8poil4hLXdnMTIhdJ3di', '40 rue Alexandre Dumas Paris', 'Chant', '200', '24', 'profe', '2023-10-12 16:18:03', '2023-10-14 10:23:33');

-- --------------------------------------------------------

--
-- Structure de la table `publications`
--

CREATE TABLE `publications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(150) DEFAULT NULL,
  `vedeo` varchar(150) DEFAULT NULL,
  `titre` varchar(150) NOT NULL,
  `description` varchar(150) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `publications`
--

INSERT INTO `publications` (`id`, `image`, `vedeo`, `titre`, `description`, `created_at`, `updated_at`) VALUES
(1, '1697202830.jfif', NULL, 'Nouveau local', 'dazdadz', '2023-10-13 11:13:50', '2023-10-13 11:13:50'),
(2, '1697203215.JPG', NULL, 'Lol', 'Mdr', '2023-10-13 11:20:15', '2023-10-13 11:20:15');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(150) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commentaires_membre_id_foreign` (`membre_id`),
  ADD KEY `commentaires_publication_id_foreign` (`publication_id`);

--
-- Index pour la table `compte_ecole`
--
ALTER TABLE `compte_ecole`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `compte_eleve`
--
ALTER TABLE `compte_eleve`
  ADD PRIMARY KEY (`id`),
  ADD KEY `compte_eleve_eleve_id_foreign` (`eleve_id`);

--
-- Index pour la table `compte_prof`
--
ALTER TABLE `compte_prof`
  ADD PRIMARY KEY (`id`),
  ADD KEY `compte_prof_prof_id_foreign` (`prof_id`);

--
-- Index pour la table `coures`
--
ALTER TABLE `coures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coures_profe_id_foreign` (`profe_id`);

--
-- Index pour la table `elev_coures`
--
ALTER TABLE `elev_coures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `elev_coures_membre_id_foreign` (`membre_id`),
  ADD KEY `elev_coures_coure_id_foreign` (`coure_id`);

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `factures`
--
ALTER TABLE `factures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `factures_membre_id_foreign` (`membre_id`),
  ADD KEY `factures_coure_id_foreign` (`coure_id`);

--
-- Index pour la table `factures_membres`
--
ALTER TABLE `factures_membres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `factures_membres_membre_id_foreign` (`membre_id`),
  ADD KEY `factures_membres_facture_id_foreign` (`facture_id`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `familles`
--
ALTER TABLE `familles`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `likes_membre_id_foreign` (`membre_id`),
  ADD KEY `likes_publication_id_foreign` (`publication_id`);

--
-- Index pour la table `membres`
--
ALTER TABLE `membres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `membres_famille_id_foreign` (`famille_id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `profes`
--
ALTER TABLE `profes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `commentaires`
--
ALTER TABLE `commentaires`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `compte_ecole`
--
ALTER TABLE `compte_ecole`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `compte_eleve`
--
ALTER TABLE `compte_eleve`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `compte_prof`
--
ALTER TABLE `compte_prof`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `coures`
--
ALTER TABLE `coures`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=203;

--
-- AUTO_INCREMENT pour la table `elev_coures`
--
ALTER TABLE `elev_coures`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `factures`
--
ALTER TABLE `factures`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `factures_membres`
--
ALTER TABLE `factures_membres`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `familles`
--
ALTER TABLE `familles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `membres`
--
ALTER TABLE `membres`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `profes`
--
ALTER TABLE `profes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `publications`
--
ALTER TABLE `publications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD CONSTRAINT `commentaires_membre_id_foreign` FOREIGN KEY (`membre_id`) REFERENCES `membres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `commentaires_publication_id_foreign` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `compte_eleve`
--
ALTER TABLE `compte_eleve`
  ADD CONSTRAINT `compte_eleve_eleve_id_foreign` FOREIGN KEY (`eleve_id`) REFERENCES `membres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `compte_prof`
--
ALTER TABLE `compte_prof`
  ADD CONSTRAINT `compte_prof_prof_id_foreign` FOREIGN KEY (`prof_id`) REFERENCES `profes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `coures`
--
ALTER TABLE `coures`
  ADD CONSTRAINT `coures_profe_id_foreign` FOREIGN KEY (`profe_id`) REFERENCES `profes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `elev_coures`
--
ALTER TABLE `elev_coures`
  ADD CONSTRAINT `elev_coures_coure_id_foreign` FOREIGN KEY (`coure_id`) REFERENCES `coures` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `elev_coures_membre_id_foreign` FOREIGN KEY (`membre_id`) REFERENCES `membres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `factures`
--
ALTER TABLE `factures`
  ADD CONSTRAINT `factures_coure_id_foreign` FOREIGN KEY (`coure_id`) REFERENCES `coures` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `factures_membre_id_foreign` FOREIGN KEY (`membre_id`) REFERENCES `membres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `factures_membres`
--
ALTER TABLE `factures_membres`
  ADD CONSTRAINT `factures_membres_facture_id_foreign` FOREIGN KEY (`facture_id`) REFERENCES `factures` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `factures_membres_membre_id_foreign` FOREIGN KEY (`membre_id`) REFERENCES `membres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_membre_id_foreign` FOREIGN KEY (`membre_id`) REFERENCES `membres` (`id`),
  ADD CONSTRAINT `likes_publication_id_foreign` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `membres`
--
ALTER TABLE `membres`
  ADD CONSTRAINT `membres_famille_id_foreign` FOREIGN KEY (`famille_id`) REFERENCES `familles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
