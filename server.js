const express = require('express');

const app = express();

const notesRoutes = require('.db/db.json');

// parse incoming strng or array data
app.use(express.urlencoded({ extended: true}));
// parse incoming JSON data
app.use(express.json());
// links css/javascript files for HTML pages
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(notesRoutes);
});


// Route to get index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});







app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

// app.listen(3001, () => {
//     console.log(`API server now on port 3001!`);
//   });