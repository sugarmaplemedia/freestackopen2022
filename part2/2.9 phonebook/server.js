const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'pub')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'pub', 'index.html'));
});

app.listen(3000);