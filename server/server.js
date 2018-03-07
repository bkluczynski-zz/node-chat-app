const path = require('path');

const publicPath = path.join(__dirname, '../public');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// handling client resources
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`app is litening on port ${port}`);
});
