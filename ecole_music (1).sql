-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 17 sep. 2023 à 16:28
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ecole_music`
--

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`id`, `nom`, `prenom`, `email`, `password`, `type`, `created_at`, `updated_at`) VALUES
(1, 'houssni', 'ismail', 'ismailJM@gmail.com', '$2y$10$Bjl6nKktdfWv1l74QMUNJeouQEkUjgWrcFFWvwgDDmQdIE4qEutgi', 'admin', NULL, NULL),
(2, 'ismail', 'houssni', 'hjbjhjjjf@gmail.com', '$2y$10$zxDG.kDANujzEygJ18by5uQyI0olKDY/KDbgSUv6bQSccOwu80B8.', 'admin', '2023-07-27 19:55:37', '2023-07-27 19:55:37'),
(3, 'ismail', 'houssni', 'gggggggggg@gmail.com', '$2y$10$lClK7d34MQxECO4UgmVZNeLHrehLz5xvaVA..8sw8ejVGKp/5nC62', 'admin', '2023-07-27 19:57:19', '2023-07-27 19:57:19');

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

CREATE TABLE `commentaires` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `membre_id` bigint(20) UNSIGNED NOT NULL,
  `publication_id` bigint(20) UNSIGNED NOT NULL,
  `comment` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `coures`
--

CREATE TABLE `coures` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `titre` varchar(255) NOT NULL,
  `prix_horaire` double(8,2) NOT NULL,
  `etat` tinyint(1) NOT NULL DEFAULT 0,
  `debut_de_coure` datetime NOT NULL,
  `fin_de_coure` datetime NOT NULL,
  `profe_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `coures`
--

INSERT INTO `coures` (`id`, `titre`, `prix_horaire`, `etat`, `debut_de_coure`, `fin_de_coure`, `profe_id`, `created_at`, `updated_at`) VALUES
(7, 'gutar', 125.00, 1, '2023-07-17 18:00:00', '2023-07-17 19:00:00', 6, '2023-07-17 13:55:17', '2023-07-17 13:55:17'),
(8, 'hello', 123.00, 0, '2023-08-20 18:36:00', '2023-08-20 21:36:00', 6, '2023-08-20 14:37:00', '2023-08-20 14:37:00'),
(9, 'felll', 123.00, 0, '2023-08-21 14:00:00', '2023-08-21 16:00:00', 6, '2023-08-20 14:38:44', '2023-08-20 14:38:44');

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
(1, 1, 7, '2023-07-17 14:03:10', '2023-07-17 14:03:10'),
(2, 5, 7, '2023-07-17 14:04:00', '2023-07-17 14:04:00'),
(3, 5, 7, '2023-07-17 14:04:02', '2023-07-17 14:04:02');

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `titre` varchar(255) NOT NULL,
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
  `uuid` varchar(255) NOT NULL,
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
  `nom` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `familles`
--

INSERT INTO `familles` (`id`, `nom`, `created_at`, `updated_at`) VALUES
(1, 'berada', '2023-06-24 10:34:53', '2023-06-24 10:34:53'),
(2, 'houssni', '2023-07-15 10:58:00', '2023-07-15 10:58:00'),
(3, 'houssni', '2023-07-15 10:58:02', '2023-07-15 10:58:02'),
(4, 'HOUSSNI1', '2023-07-15 10:59:39', '2023-07-15 10:59:39'),
(5, 'moumou', '2023-07-17 13:56:48', '2023-07-17 13:56:48');

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
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `tel` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `solde` double(8,2) NOT NULL,
  `famille_id` bigint(20) UNSIGNED NOT NULL,
  `etudient` tinyint(1) NOT NULL DEFAULT 0,
  `type` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL DEFAULT 'member',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `membres`
--

INSERT INTO `membres` (`id`, `nom`, `prenom`, `tel`, `email`, `password`, `adresse`, `solde`, `famille_id`, `etudient`, `type`, `rol`, `created_at`, `updated_at`) VALUES
(1, 'HOUSSNI', 'ISMAIL', '0621457823', 'houssniismail6@gmail.com', '$2y$10$iNxduwAlW5vRBlRJwTXg.OmDljA5n3WwyKIBskoFC9TiLb8XCfk12', 'QU HRILA GZOULA SAFI', 123.00, 1, 1, 'mere', 'member', '2023-06-24 10:35:33', '2023-06-24 10:35:33'),
(2, 'HOUSSNI', 'ISMAIL', '0621457823', 'houssniismail6@gmail.com', '$2y$10$RLgS235zCIYb/QM5MqSIv.10JnqDY/E8AaGoI2R2nrs0/upWhtxEm', 'QU HRILA GZOULA SAFI', 123.00, 1, 1, 'mere', 'member', '2023-06-24 10:39:43', '2023-06-24 10:39:43'),
(3, 'HOUSSNI', 'ISMAIL', '12452548569', 'hjbjhjjjf@gmail.com', '$2y$10$uShBvtOAP1N8LQuzRD8xVeuLqHjCTj8JHZ8/bYCvnxiwcQTFBfHjS', 'QU HRILA GZOULA SAFI', 1254.00, 1, 1, 'mere', 'member', '2023-06-24 10:55:05', '2023-06-24 10:55:05'),
(4, 'HOUSSNI', 'ISMAIL', '12345678', '12345678@gmail.com', '$2y$10$L1fgJnzXZZ01Up25Tl/dEegzULaAYE5dA4hyd/6vpr.CKUhuIkgYa', 'QU HRILA GZOULA SAFI', 123.00, 1, 1, 'mere', 'member', '2023-07-17 12:59:48', '2023-07-17 12:59:48'),
(5, 'megoure', 'ayoub', '0703040508', 'ayoube12@gmail.com', '$2y$10$E5SvY86R9WCCeWesRBvFde.QA3Upe3Q1apdFeKR6nyh9HLrU3kEPi', 'QU HRILA GZOULA SAFI', 134.00, 5, 1, 'pere', 'member', '2023-07-17 14:00:07', '2023-07-17 14:00:07'),
(6, 'houssni', 'ismail', '0702221854', 'jjjjjjj@gmail.com', '$2y$10$.KzDicPiuLdAMpD0bEf9FOc/nAujJ7SDX0MC4u/HgxNDmVKbcIAvO', 'qu hrila gzoula safi', 1245.00, 1, 0, 'pere', 'member', '2023-08-01 13:31:55', '2023-08-01 13:31:55'),
(7, 'houssni', 'ismail', '0702221854', 'jjjjjjj@gmail.com', '$2y$10$4URq1x30Xsbb2T1ib1xRyuDWl1c3NPfoeI4XIbT8MdW6ljJWxtksy', 'qu hrila gzoula safi', 1245.00, 1, 0, 'pere', 'member', '2023-08-01 13:31:55', '2023-08-01 13:31:55'),
(8, 'houssni', 'ismail', '0702221854', 'jjjjjjj@gmail.com', '$2y$10$mevoJf00vw0otZdWP1ogT.kCxOqDZeGeMeMxtVVKy.EtXgjSex8eO', 'qu hrila gzoula safi', 1245.00, 1, 0, 'pere', 'member', '2023-08-01 13:37:03', '2023-08-01 13:37:03'),
(9, 'houssni', 'ismail', '0702221854', 'jjjjjjj@gmail.com', '$2y$10$G/hKt2z6msk57SHRF6H1DephfWjfzBVamvcddPwlMRdqs8YHsULOm', 'qu hrila gzoula safi', 1245.00, 1, 0, 'pere', 'member', '2023-08-01 13:37:04', '2023-08-01 13:37:04'),
(10, 'hassan', 'allali', '07012363456', 'houssniismail12@gmail.com', '$2y$10$LmrNPaxpecJG.358rO.BzOQ0//Vt4HZJgkpks9.BpsbCISfIAsLQG', 'QU HRILA GZOULA SAFI', 12.00, 1, 1, 'enfant', 'member', '2023-08-10 18:05:00', '2023-08-14 12:55:28');

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(111, '2014_10_12_000000_create_users_table', 1),
(112, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(113, '2019_08_19_000000_create_failed_jobs_table', 1),
(114, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(115, '2023_04_12_095907_create_admins_table', 1),
(116, '2023_05_10_101044_create_familles_table', 1),
(117, '2023_05_15_132457_create_profes_table', 1),
(118, '2023_05_15_140223_create_membres_table', 1),
(119, '2023_05_15_142313_create_coures_table', 1),
(120, '2023_05_15_144033_create_elev_coures_table', 1),
(121, '2023_05_15_150320_create_publications_table', 1),
(122, '2023_05_15_150844_create_likes_table', 1),
(123, '2023_05_15_151353_create_commentaires_table', 1),
(124, '2023_05_16_145324_create_factures_table', 1),
(125, '2023_05_16_152400_create_factures_membres', 1),
(126, '2023_06_04_220622_create_events_table', 1);

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
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
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `tel` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `adress` varchar(255) NOT NULL,
  `instrument` varchar(255) NOT NULL,
  `cv` varchar(255) NOT NULL,
  `tarif` varchar(255) NOT NULL,
  `solde` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'profe',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `profes`
--

INSERT INTO `profes` (`id`, `nom`, `prenom`, `tel`, `email`, `password`, `adress`, `instrument`, `cv`, `tarif`, `solde`, `type`, `created_at`, `updated_at`, `token`) VALUES
(6, 'koulafa', 'khalid', '0702221863', 'Kalid12@gmail.com', '$2y$10$qEit2fUoHm8LzBIQJDAtUul8JsYtHFwnE/E1R1ELZHwgavqGC2sRC', 'hay matar', 'hhhhhhhh', '1688222383.pdf', '754', '142', 'profe', '2023-07-01 12:39:44', '2023-08-14 12:58:18', '$2y$10$upau533jV4leqIgb6vqjf.FkMUVe/GxmJeQOMyj0ByqJBhv6RjFou');

-- --------------------------------------------------------

--
-- Structure de la table `publications`
--

CREATE TABLE `publications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `vedeo` varchar(255) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `publications`
--

INSERT INTO `publications` (`id`, `image`, `vedeo`, `description`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, 'majidi', '2023-07-13 15:15:03', '2023-07-13 15:15:03'),
(2, NULL, NULL, 'majidi', '2023-07-13 15:15:09', '2023-07-13 15:15:09'),
(3, NULL, NULL, 'majidi', '2023-07-13 15:15:11', '2023-07-13 15:15:11');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `commentaires`
--
ALTER TABLE `commentaires`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `coures`
--
ALTER TABLE `coures`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `elev_coures`
--
ALTER TABLE `elev_coures`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `membres`
--
ALTER TABLE `membres`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `profes`
--
ALTER TABLE `profes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `publications`
--
ALTER TABLE `publications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
