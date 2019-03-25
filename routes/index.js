var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:nom/:prenom/:email/:mdp/:tel/ajoutClient', async (req, res) => {
  try {
    // Connection URL
    const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var nom = req.params.nom;
    var prenom = req.params.prenom;
    var email = req.params.email;
    var tel = req.params.tel;
    var mdp = req.params.mdp;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Client');
    col.insertMany([{nom: nom, prenom: prenom, email: email, mdp: mdp, tel: tel}]);
    res.send(col.find().toArray());
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});

router.get('/:email/:mdp/connexionClient', async (req, res) => {
  try {
    // Connection URL
    const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var email = req.params.email;
    var mdp = req.params.mdp;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Client');
    var find = await col.find({email: email, mdp: mdp}).toArray();
    console.log(find);
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});

router.get('/:email/:mdp/supprimerClient', async (req, res) => {
  try {
    // Connection URL
    const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var email = req.params.email;
    var mdp = req.params.mdp;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Client');
    col.deleteOne({email: email, mdp: mdp});
    res.send("Client Supprimé");
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});

module.exports = router;
