
const Configuration = require('../models/Configuration');
const Component = require('../models/Component');
const { validationResult } = require('express-validator');

exports.getAllConfigurations = async (req, res) => {
  try {
    // If user is not admin, only return their configurations
    const query = req.user.role === 'admin' ? {} : { userId: req.user.userId };
    
    const configurations = await Configuration.find(query)
      .populate('userId', 'username email')
      .populate('components');
    
    res.json(configurations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getConfiguration = async (req, res) => {
  try {
    const configuration = await Configuration.findById(req.params.id)
      .populate('userId', 'username email')
      .populate('components');
    
    if (!configuration) {
      return res.status(404).json({ message: 'Configuration non trouvée' });
    }
    
    // Check if user is authorized to view this configuration
    if (req.user.role !== 'admin' && configuration.userId._id.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Non autorisé' });
    }
    
    res.json(configuration);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.createConfiguration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Validate components
    if (!req.body.components || !Array.isArray(req.body.components) || req.body.components.length === 0) {
      return res.status(400).json({ message: 'Au moins un composant est requis' });
    }

    // Calculate total price based on components
    let totalPrice = 0;
    const components = [];
    
    for (const componentId of req.body.components) {
      const component = await Component.findById(componentId);
      if (!component) {
        return res.status(400).json({ message: `Composant ${componentId} non trouvé` });
      }
      
      components.push(component);
      totalPrice += component.price;
    }

    const configuration = new Configuration({
      userId: req.user.userId,
      name: req.body.name,
      components: req.body.components,
      totalPrice
    });
    
    await configuration.save();
    
    res.status(201).json(configuration);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.updateConfiguration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find the configuration first
    const configuration = await Configuration.findById(req.params.id);
    
    if (!configuration) {
      return res.status(404).json({ message: 'Configuration non trouvée' });
    }
    
    // Check if user is authorized to update this configuration
    if (req.user.role !== 'admin' && configuration.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    // Calculate new total price if components are being updated
    if (req.body.components && Array.isArray(req.body.components) && req.body.components.length > 0) {
      let totalPrice = 0;
      
      for (const componentId of req.body.components) {
        const component = await Component.findById(componentId);
        if (!component) {
          return res.status(400).json({ message: `Composant ${componentId} non trouvé` });
        }
        
        totalPrice += component.price;
      }
      
      req.body.totalPrice = totalPrice;
    }

    const updatedConfiguration = await Configuration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json(updatedConfiguration);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.deleteConfiguration = async (req, res) => {
  try {
    const configuration = await Configuration.findById(req.params.id);
    
    if (!configuration) {
      return res.status(404).json({ message: 'Configuration non trouvée' });
    }
    
    // Check if user is authorized to delete this configuration
    if (req.user.role !== 'admin' && configuration.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Non autorisé' });
    }
    
    await Configuration.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Configuration supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
