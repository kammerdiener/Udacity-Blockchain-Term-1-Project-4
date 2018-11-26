// Get Express stuffs set up
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Get the Chain Ready
const chain = require('./simpleChain');
const blockchain = new chain.Blockchain();

// Health Route
app.get('/healthcheck', (req, res) => res.json({ healthy: true }));

// The Extras
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


app.post("/requestValidation", async (req, res) => { // Your code });



// Get a Block
app.get('/block/:height', async (req, res) => {
  blockchain.getBlock(req.params.height)
    .then((block) => {
      res.send(block)
    })
    .catch((err) => {
      res.status(404).json({
        "code": 404,
        "message": err // since this is a project go ahead and return the error
      })
    })
});

// Add a block
app.post('/block', async (req, res) => {
  const newBlockPayload = req.body.body;
  if (newBlockPayload === '' || newBlockPayload === undefined){
    res.status(400).json({
      "code": 400,
      "message": "Empty or Undefined payload"
    })
  }

  const newBlock = new chain.Block(newBlockPayload);
  blockchain.addBlock(newBlock)
    .then((block) => {
      res.send(JSON.parse(block))
    })
    .catch((err) => {
      res.status(404).json({
        "code": 404,
        "message": err // since this is a project go ahead and return the error
      })
    })
});

// Starting the Server
app.set('port', 8000);

app.listen(app.get('port'), function () {
  console.log('Live long and prosper on ' + app.get('port'));
});