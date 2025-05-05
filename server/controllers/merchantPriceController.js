import MerchantPrice from '../models/MerchantPrice.js';
import { validationResult } from 'express-validator';

export const getAllMerchantPrices = async (req, res) => {
  try {
    let query = {};
    
    // Filter by component if provided
    if (req.query.componentId) {
      query.componentId = req.query.componentId;
    }
    
    // Filter by merchant if provided
    if (req.query.merchantId) {
      query.merchantId = req.query.merchantId;
    }
    
    const merchantPrices = await MerchantPrice.find(query)
      .populate('merchantId')
      .populate('componentId');
    
    res.json(merchantPrices);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getMerchantPrice = async (req, res) => {
  try {
    const merchantPrice = await MerchantPrice.findById(req.params.id)
      .populate('merchantId')
      .populate('componentId');
    
    if (!merchantPrice) {
      return res.status(404).json({ message: 'Prix marchand non trouvé' });
    }
    
    res.json(merchantPrice);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const createMerchantPrice = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check for duplicate merchant-component pair
    const existing = await MerchantPrice.findOne({
      merchantId: req.body.merchantId,
      componentId: req.body.componentId
    });
    
    if (existing) {
      return res.status(400).json({ 
        message: 'Ce prix existe déjà pour ce marchand et ce composant' 
      });
    }

    const merchantPrice = new MerchantPrice(req.body);
    await merchantPrice.save();
    
    res.status(201).json(merchantPrice);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const updateMerchantPrice = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const merchantPrice = await MerchantPrice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!merchantPrice) {
      return res.status(404).json({ message: 'Prix marchand non trouvé' });
    }
    
    res.json(merchantPrice);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const deleteMerchantPrice = async (req, res) => {
  try {
    const merchantPrice = await MerchantPrice.findByIdAndDelete(req.params.id);
    
    if (!merchantPrice) {
      return res.status(404).json({ message: 'Prix marchand non trouvé' });
    }
    
    res.json({ message: 'Prix marchand supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
