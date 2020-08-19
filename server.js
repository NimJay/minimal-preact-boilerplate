/*
This file starts up a Node.js Express web server.
*/

const express = require('express');
const PORT = 3003;
var app = express();

// Serve this directory.
app.use(express.static(__dirname + '/hosted-files/'));

// Send index.html for all pages.
var sendIndex = (req, res) => {res.sendFile(__dirname + '/hosted-files/index.html');}
app.get('/some', sendIndex);

// Everything else: index.html with 404.
app.use((req, res) => {
  res.status(404);
  res.sendFile(__dirname + '/hosted-files/index.html');
});

app.listen(PORT, function () {
  console.log('Server running at: http://locahost:' + PORT);
});
