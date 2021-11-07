const PORT = process.env.PORT || 3001;
const express = require('express');

const app = express();
const fs = require('fs');
const path = require('path');



const notesRoutes = require('./db/db.json');

// parse incoming strng or array data
app.use(express.urlencoded({ extended: true}));
// parse incoming JSON data
app.use(express.json());
// links css/javascript files for HTML pages
app.use(express.static('public'));


function generateNote(body, noteTakerArray ) {
    const note = body;
    if (!Array.isArray(noteTakerArray))
        noteTakerArray = [];   

    if(noteTakerArray.length === 0)
        // Starts array at object '1'
        noteTakerArray.push(1);
        // Provides unique id to each array object
        body.id = noteTakerArray[0];
        // Increases unqiue id by 1 each time array object is created
        noteTakerArray[0]++;
        // Pushes new note object to note taker array
        noteTakerArray.push(note);
        // takes notes and writes to json file
        fs.writeFileSync(path.join(__dirname, './db/db.json'),
        // creates User Notes database for notes to be stored
            JSON.stringify({ userNotes: noteTakerArray }, null, 2)
    );


    return note;
}




app.get('/api/notes', (req, res) => {
// Extracts notes from json file to be displayed on notes.html "1" starts the extract at 2nd Object in the array
    res.json(notesRoutes.slice(1));
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