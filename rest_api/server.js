require('dotenv').config({ path: './config/.env' }); // Charger les variables d'environnement depuis le dossier config
const mongoose = require('mongoose');
const express = require('express');

const User = require('./models/User');

// Connexion à MongoDB
const connectToDatabase = async () => {
    try {
      const MONGO_URI = process.env.MONGO_URI;
      if (!MONGO_URI) {
        throw new Error('La variable d\'environnement MONGO_URI n\'est pas définie.');
      }
  
      await mongoose.connect(MONGO_URI); // Connexion sans options obsolètes
      console.log('Connexion à MongoDB réussie');
    } catch (err) {
      console.error('Erreur de connexion à MongoDB :', err.message);
      process.exit(1);
    }
  };
  

// Initialisation d'Express
const app = express();
app.use(express.json());

// Routes
app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
    
  // Route POST pour ajouter un utilisateur
  app.post('/users', async (req, res) => {
    const { name, email, age } = req.body;
    try {
      const newUser = new User({ name, email, age });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Route PUT pour modifier un utilisateur par ID
  app.put('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Route DELETE pour supprimer un utilisateur par ID
  app.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
      res.status(200).json({ message: 'Utilisateur supprimé' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

// Connexion à la base de données
connectToDatabase();
