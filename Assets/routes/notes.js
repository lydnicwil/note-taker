const note = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require('fs');

note.get('/', (req, res) => readFromFile('../Assets/db/db.json').then((data) => res.json(JSON.parse(data))));

note.post('/', (req, res) => {
    const { title, text} = req.body;

    if (title && text) {
      const newNote = {
        title, text, id: uuid() };
  
      readAndAppend(newNote, '../Assets/db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting feedback');
    }
  });

  note.delete('/:id', (req, res) => 
  {

    readFromFile('../Assets/db/db.json').then((data) => 
    {
      let newData = JSON.parse(data);
    
      const deletedJSON = newData.filter( note => note.id.toString() !== req.params.id.toString());

      writeToFile('../Assets/db/db.json', deletedJSON);

      res.json(deletedJSON);

    })
  })

  module.exports = note;
