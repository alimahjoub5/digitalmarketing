-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 28 mars 2023 à 10:31
-- Version du serveur : 8.0.31
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `marketing`
--

-- --------------------------------------------------------

--
-- Structure de la table `administrateurs`
--

CREATE TABLE `administrateurs` (
  `ID_Admin` int NOT NULL,
  `Nom_Admin` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Mot_de_passe` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `solde` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Structure de la table `annonces`
--

CREATE TABLE `annonces` (
  `ID_Annonce` int NOT NULL,
  `ID_Entreprise` int DEFAULT NULL,
  `Titre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Description` text COLLATE utf8mb4_general_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `NB_Vue` int,
  `Cout_par_vue` float NOT NULL,
  `ID_Categorie` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `campagnes`
--

CREATE TABLE `campagnes` (
  `ID_Campagne` int NOT NULL,
  `ID_Entreprise` int NOT NULL,
  `Nom_de_la_campagne` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Budget` float DEFAULT NULL,
  `Date_de_début` date DEFAULT NULL,
  `Date_de_fin` date DEFAULT NULL,
  `Critères_de_ciblage` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `ID_Categorie` int NOT NULL,
  `Nom_Categorie` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Description` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `entreprises`
--

CREATE TABLE `entreprises` (
  `ID_Entreprise` int NOT NULL,
  `Nom_Entreprise` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Mot_de_passe` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Solde` float DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `feedback`
--

CREATE TABLE `feedback` (
  `ID_Feedback` int NOT NULL,
  `ID_Utilisateur` int DEFAULT NULL,
  `ID_Entreprise` int DEFAULT NULL,
  `Note` float NOT NULL,
  `Texte_du_commentaire` text COLLATE utf8mb4_general_ci NOT NULL,
  `Date_du_commentaire` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `transactions`
--

CREATE TABLE `transactions` (
  `ID_Transaction` int NOT NULL AUTO_INCREMENT,
  `ID_Emetteur` int NOT NULL,
  `ID_Receveur` int NOT NULL,
  `Montant` float NOT NULL,
  `Date_de_transaction` date NOT NULL,
  PRIMARY KEY (`ID_Transaction`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `ID_Utilisateur` int NOT NULL,
  `Nom_Utilisateur` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `tel` varchar(12) COLLATE utf8mb4_general_ci NOT NULL,
  `Mot_de_passe` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Solde` float DEFAULT '0',
  `Image_de_profil` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Date_de_naissance` date DEFAULT NULL,
  `Ville` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `vues`
--

CREATE TABLE `vues` (
  `ID_Vue` int NOT NULL,
  `ID_Utilisateur` int DEFAULT NULL,
  `ID_Annonce` int DEFAULT NULL,
  `Date_de_vue` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `administrateurs`
--
ALTER TABLE `administrateurs`
  ADD PRIMARY KEY (`ID_Admin`);

--
-- Index pour la table `annonces`
--
ALTER TABLE `annonces`
  ADD PRIMARY KEY (`ID_Annonce`),
  ADD KEY `ID_Entreprise` (`ID_Entreprise`),
  ADD KEY `ID_Categorie` (`ID_Categorie`);

--
-- Index pour la table `campagnes`
--
ALTER TABLE `campagnes`
  ADD PRIMARY KEY (`ID_Campagne`),
  ADD KEY `ID_Entreprise` (`ID_Entreprise`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`ID_Categorie`);

--
-- Index pour la table `entreprises`
--
ALTER TABLE `entreprises`
  ADD PRIMARY KEY (`ID_Entreprise`);

--
-- Index pour la table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`ID_Feedback`),
  ADD KEY `ID_Utilisateur` (`ID_Utilisateur`),
  ADD KEY `ID_Entreprise` (`ID_Entreprise`);

--
-- Index pour la table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`ID_Transaction`),
  ADD KEY `ID_Emetteur` (`ID_Emetteur`),
  ADD KEY `ID_Receveur` (`ID_Receveur`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`ID_Utilisateur`);

--
-- Index pour la table `vues`
--
ALTER TABLE `vues`
  ADD PRIMARY KEY (`ID_Vue`),
  ADD KEY `ID_Utilisateur` (`ID_Utilisateur`),
  ADD KEY `ID_Annonce` (`ID_Annonce`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `administrateurs`
--
ALTER TABLE `administrateurs`
  MODIFY `ID_Admin` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `annonces`
--
ALTER TABLE `annonces`
  MODIFY `ID_Annonce` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `campagnes`
--
ALTER TABLE `campagnes`
  MODIFY `ID_Campagne` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `ID_Categorie` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `entreprises`
--
ALTER TABLE `entreprises`
  MODIFY `ID_Entreprise` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `ID_Feedback` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `ID_Transaction` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `ID_Utilisateur` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `vues`
--
ALTER TABLE `vues`
  MODIFY `ID_Vue` int NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `annonces`
--
ALTER TABLE `annonces`
  ADD CONSTRAINT `annonces_ibfk_1` FOREIGN KEY (`ID_Entreprise`) REFERENCES `entreprises` (`ID_Entreprise`),
  ADD CONSTRAINT `annonces_ibfk_2` FOREIGN KEY (`ID_Categorie`) REFERENCES `categories` (`ID_Categorie`);

--
-- Contraintes pour la table `campagnes`
--
ALTER TABLE `campagnes`
  ADD CONSTRAINT `campagnes_ibfk_1` FOREIGN KEY (`ID_Entreprise`) REFERENCES `entreprises` (`ID_Entreprise`);

--
-- Contraintes pour la table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`ID_Utilisateur`) REFERENCES `utilisateurs` (`ID_Utilisateur`),
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`ID_Entreprise`) REFERENCES `entreprises` (`ID_Entreprise`);

--
-- Contraintes pour la table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`ID_Emetteur`) REFERENCES `utilisateurs` (`ID_Utilisateur`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`ID_Receveur`) REFERENCES `utilisateurs` (`ID_Utilisateur`) ON DELETE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`ID_Emetteur`) REFERENCES `entreprises` (`ID_Entreprise`),
  ADD CONSTRAINT `transactions_ibfk_4` FOREIGN KEY (`ID_Receveur`) REFERENCES `entreprises` (`ID_Entreprise`) ON DELETE CASCADE;

--
-- Contraintes pour la table `vues`
--
ALTER TABLE `vues`
  ADD CONSTRAINT `vues_ibfk_1` FOREIGN KEY (`ID_Utilisateur`) REFERENCES `utilisateurs` (`ID_Utilisateur`),
  ADD CONSTRAINT `vues_ibfk_2` FOREIGN KEY (`ID_Annonce`) REFERENCES `annonces` (`ID_Annonce`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
