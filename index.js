const express = require('express');
const path = require('path')
const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/new', (req, res) => {
  res.sendFile(__dirname + '/new.html')
})

app.listen(3000)
