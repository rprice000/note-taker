const express = require('express');

const app = express();
const fs = require('fs');
const path = require('path');



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


// Route to get notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Route for Wildcard request
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

function generateNote(body, noteTakerArray ) {
    const note = body;
    if(!Array.isArray(noteTakerArray))
        noteTakerArray = [];
    if(noteTakerArray.length === 0)
        noteTakerArray.push(0);
        body.id = noteTakerArray[0];
        noteTakerArray[0]++;
        noteTakerArray.push(note);
        fs.writeFileSync(path.join(__dirname, './db/db.json'),
            JSON.stringify(noteTakerArray, null, 2)
    );



    return body;
}

app.post('/api/notes', (req, res) => {
    const note = generateNote(req.body, notesRoutes);
    res.json(note);
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

// app.listen(3001, () => {
//     console.log(`API server now on port 3001!`);
//   });