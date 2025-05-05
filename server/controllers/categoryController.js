import Category from '../models/Category.js';
import { validationResult } from 'express-validator';

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const createCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Cette catégorie existe déjà' });
    }
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Cette catégorie existe déjà' });
    }
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.json({ message: 'Catégorie supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
