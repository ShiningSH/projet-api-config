import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    // Extraction du token à partir du header Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentification requise' });
    }

    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ajouter l'information de l'utilisateur dans la requête
    req.user = decoded; // Décodé : { userId, role }
    
    // Passer au middleware suivant
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

// Exporter le middleware avec 'export default' pour ES6
export default auth;
