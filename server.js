const express = require('express');
const { animals } = require('./data/animals');

// fs to write file
// path is built into nodes api used to provide utilities for working with file and directory paths
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());



function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {

            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filtered results:
    return filteredResults;
}

function findByID(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
};

function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);

    // return finished code to post route for response
    return animal;
}
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
    const result = findByID(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404)
    }
});

app.post('/api/animals', (req, res) => {
    // req.body is where our incoming content will be
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // add animal to json file and animalsArray in this function
    const animal = createNewAnimal(req.body, animals);

    res.json(animals);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});