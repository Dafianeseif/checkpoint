const express = require('express');
const app = express();
const path = require('path');

// Middleware pour vérifier l'heure
function checkBusinessHours(req, res, next) {
    const currentDate = new Date();
    const day = currentDate.getDay(); // 0 (dimanche) à 6 (samedi)
    const hour = currentDate.getHours(); // de 0 à 23

    // Vérifier si c'est un jour de semaine (1 à 5) et si l'heure est entre 9 et 17
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Continue si dans les heures de travail
    } else {
        res.status(403).send('L\'application est disponible uniquement pendant les heures de travail (lundi à vendredi, de 9h à 17h).');
    }
}

app.use(checkBusinessHours);

// Configuration de la vue avec EJS (ou utilisez des fichiers statiques si préféré)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir les fichiers statiques (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('Accueil');
});

app.get('/services', (req, res) => {
    res.render('Nos_seervices');
});

app.get('/contact', (req, res) => {
    res.render('Nous_contacter');
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Serveur en cours d\'exécution sur http://localhost:3000');
});
