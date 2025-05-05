import User from '../models/User.js';
import { validationResult } from 'express-validator';

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Récupérer tous les utilisateurs sans le mot de passe
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    // Gestion d'erreur serveur
    console.error(error); // Pour faciliter le debug
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getUser = async (req, res) => {
  try {
    // Récupérer un utilisateur par ID sans le mot de passe
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    res.json(user);
  } catch (error) {
    // Gestion d'erreur serveur
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const updateUser = async (req, res) => {
  try {
    // Validation des données
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Vérification des droits de l'utilisateur pour la mise à jour
    if (req.user.role !== 'admin' && req.params.id !== req.user.userId) {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    // Exclure le mot de passe des données à mettre à jour
    const { password, ...updateData } = req.body;

    // Seuls les admins peuvent changer les rôles
    if (req.user.role !== 'admin' && updateData.role) {
      delete updateData.role;
    }

    // Mise à jour de l'utilisateur
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    res.json(user);
  } catch (error) {
    // Gestion des erreurs spécifiques (ex : email déjà utilisé)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Cet email ou ce nom d\'utilisateur est déjà utilisé' });
    }
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // Vérification des droits pour supprimer l'utilisateur
    if (req.user.role !== 'admin' && req.params.id !== req.user.userId) {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    // Suppression de l'utilisateur
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    // Gestion d'erreur serveur
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
