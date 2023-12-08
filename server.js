const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const directoryToServe = __dirname;

app.use(express.static(directoryToServe));

app.get('/', (req, res) => {
  res.sendFile(path.join(directoryToServe, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});