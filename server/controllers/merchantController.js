// controllers/merchantController.js

import Merchant from '../models/Merchant.js';
import { validationResult } from 'express-validator';

export const getAllMerchants = async (req, res) => {
  try {
    const merchants = await Merchant.find();
    res.json(merchants);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getMerchant = async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);
    if (!merchant) {
      return res.status(404).json({ message: 'Marchand non trouvé' });
    }
    res.json(merchant);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const createMerchant = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const merchant = new Merchant(req.body);
    await merchant.save();
    res.status(201).json(merchant);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Ce marchand existe déjà' });
    }
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const updateMerchant = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const merchant = await Merchant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!merchant) {
      return res.status(404).json({ message: 'Marchand non trouvé' });
    }
    res.json(merchant);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Ce marchand existe déjà' });
    }
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const deleteMerchant = async (req, res) => {
  try {
    const merchant = await Merchant.findByIdAndDelete(req.params.id);
    if (!merchant) {
      return res.status(404).json({ message: 'Marchand non trouvé' });
    }
    res.json({ message: 'Marchand supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
