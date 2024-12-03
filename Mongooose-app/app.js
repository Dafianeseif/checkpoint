require('dotenv').config(); // Charger les variables d'environnement
const mongoose = require('mongoose');
const Person = require('./models/person');

// Connexion à MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connexion à MongoDB réussie');
  } catch (err) {
    console.error('Erreur de connexion à MongoDB :', err);
    process.exit(1); // Quitter le processus en cas d'erreur critique
  }
};

// Fonction pour créer et sauvegarder plusieurs personnes
const createAndSaveMultiplePeople = async () => {
  try {
    const arrayOfPeople = [
      { name: 'Ahmed', age: 30, favoriteFoods: ['Chakchouka', 'Brik'] },
      { name: 'Khaled', age: 22, favoriteFoods: ['Couscous', 'Tajine'] },
      { name: 'Sami', age: 28, favoriteFoods: ['Makroud', 'Salade tunisienne'] },
      { name: 'Mary', age: 20, favoriteFoods: ['Burritos', 'Pizza'] }
    ];

    // Ajouter plusieurs personnes
    const savedPeople = await Person.create(arrayOfPeople);
    console.log('Personnes sauvegardées :', savedPeople);
  } catch (err) {
    console.error('Erreur lors de la sauvegarde des personnes :', err);
  }
};

// Recherche de personnes par nom
const findPeopleByName = async (name) => {
  try {
    const people = await Person.find({ name: name });
    console.log('Personnes trouvées :', people);
  } catch (err) {
    console.error('Erreur lors de la recherche :', err);
  }
};

// Recherche d'une personne par aliment préféré
const findPersonByFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food });
    console.log('Personne trouvée :', person);
  } catch (err) {
    console.error('Erreur lors de la recherche par aliment préféré :', err);
  }
};

// Recherche d'une personne par _id
const findPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId);
    console.log('Personne trouvée par ID :', person);
  } catch (err) {
    console.error('Erreur lors de la recherche par ID :', err);
  }
};

// Mise à jour d'une personne : ajout de "hamburger" à ses aliments favoris
const updatePersonFavoriteFood = async (personId) => {
  try {
    const person = await Person.findById(personId);
    person.favoriteFoods.push('Hamburger');
    await person.save();
    console.log('Personne mise à jour :', person);
  } catch (err) {
    console.error('Erreur lors de la mise à jour de la personne :', err);
  }
};

// Mise à jour d'une personne par son nom et son âge
const updatePersonAgeByName = async (personName) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true } // Renvoie le document mis à jour
    );
    console.log('Personne mise à jour :', updatedPerson);
  } catch (err) {
    console.error('Erreur lors de la mise à jour de la personne :', err);
  }
};

// Suppression d'une personne par _id
const deletePersonById = async (personId) => {
    try {
      await Person.findByIdAndDelete(personId);
      console.log('Personne supprimée');
    } catch (err) {
      console.error('Erreur lors de la suppression de la personne :', err);
    }
  };
  

// Suppression de toutes les personnes nommées "Mary"
const deletePeopleByName = async (name) => {
    try {
      const result = await Person.deleteMany({ name });
      console.log(`Personnes supprimées : ${result.deletedCount}`);
    } catch (err) {
      console.error('Erreur lors de la suppression des personnes :', err);
    }
  };
  

// Recherche enchaînée pour trouver des personnes qui aiment les burritos, trier par nom et limiter les résultats
const findPeopleWithBurritos = async () => {
  try {
    const people = await Person.find({ favoriteFoods: 'Burritos' })
      .sort({ name: 1 })
      .limit(2)
      .select('-age') // Exclure l'âge
      .exec();
    console.log('Personnes aimant les burritos :', people);
  } catch (err) {
    console.error('Erreur lors de la recherche :', err);
  }
};

// Fonction pour démarrer l'application
const startApp = async () => {
  await connectToDatabase(); // Connexion à la base de données
  await createAndSaveMultiplePeople(); // Sauvegarder plusieurs personnes
  await findPeopleByName('Ahmed'); // Recherche de personnes par nom
  await findPersonByFood('Burritos'); // Recherche de personne par aliment
  await findPersonById('674f5d0f0a9a9e3a2ce1053b'); // Remplacer par un ID valide
  await updatePersonFavoriteFood('674f5d0f0a9a9e3a2ce1053b'); // Remplacer par un ID valide
  await updatePersonAgeByName('Khaled'); // Mise à jour d'une personne par son nom
  await deletePersonById('674f5d0f0a9a9e3a2ce1053b'); // Remplacer par un ID valide
  await deletePeopleByName('Mary'); // Suppression des personnes nommées Mary
  await findPeopleWithBurritos(); // Recherche enchaînée
  mongoose.disconnect(); // Déconnexion propre après les opérations
};

startApp();
