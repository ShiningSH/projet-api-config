
const Component = require('../models/Component');
const { validationResult } = require('express-validator');

exports.getAllComponents = async (req, res) => {
  try {
    const components = await Component.find().populate('categoryId');
    res.json(components);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getComponent = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id).populate('categoryId');
    if (!component) {
      return res.status(404).json({ message: 'Composant non trouvé' });
    }
    res.json(component);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.createComponent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const component = new Component(req.body);
    await component.save();
    res.status(201).json(component);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.updateComponent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const component = await Component.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!component) {
      return res.status(404).json({ message: 'Composant non trouvé' });
    }
    res.json(component);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.deleteComponent = async (req, res) => {
  try {
    const component = await Component.findByIdAndDelete(req.params.id);
    if (!component) {
      return res.status(404).json({ message: 'Composant non trouvé' });
    }
    res.json({ message: 'Composant supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
