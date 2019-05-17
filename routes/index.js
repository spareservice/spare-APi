var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var fs = require('fs')
var ObjectId = require('mongodb').ObjectId;
const MONGODB_URI = 'mongodb+srv://sivithu:caca@cluster0-abdkp.mongodb.net/test?retryWrites=true'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* - Liste de tous les Admin - */
router.get('/admin', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('ADMin');
    var find = await col.find().toArray();
    console.log(find);
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});



/* - Liste de tous les clients - */
router.get('/client', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Client');
    var find = await col.find().toArray();
    console.log(find);
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});
/* - Liste de tous les prestataires - */
router.get('/prestataire', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Prestataire');
    var find = await col.find().toArray();
    console.log(find);
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});
/* - Liste de tous les services - */
/*router.get('/services', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Service');
    var find = await col.find().toArray();
    console.log(find);
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});
/* - Liste de tous les services avec service principal- */
router.get('/services', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var type = req.query.type;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Service');
    var find = await col.find({typeService: type}).toArray();
    //console.log(find);
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});
/* - Liste des services principaux - */
router.get('/servicesPrincipaux', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Service');
    var find = await col.distinct('typeService');//find().toArray();
    console.log(find);
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});
/* - Service Filtrer par id- */
router.get('/getService/:id', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var id = req.params.id;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Service');
    var find = await col.find({_id: ObjectId(id)}).toArray();
    //console.log(find);
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});
/* Liste des annonces */
router.get('/getAnnonces', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Annonce');
    var find = await col.find().toArray();
    console.log(find);
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});
/* - Check user deja existant - */
router.get('/:email/checkClient', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var email = req.params.email;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Client');
    var find = await col.find({email: email}).toArray();
    console.log(find);
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});
/* - Récupération des informations sur un client - */
router.get('/:email/:mdp/connexionClient', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
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
/* - Récupération des informations sur un prestataire - */
router.get('/:email/:mdp/connexionPrestataire', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var email = req.params.email;
    var mdp = req.params.mdp;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Prestataire');
    var find = await col.find({email: email, mdp: mdp}).toArray();
    console.log(find);
    res.send(find);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});
/* - Création d'un client - */
router.post('/:nom/:prenom/:email/:mdp/:tel/ajoutClient', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
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
    await col.insertMany([{nom: nom, prenom: prenom, email: email, mdp: mdp, tel: tel}]);
    var check = await col.find({nom: nom, prenom: prenom, email: email, mdp: mdp, tel: tel}).toArray();
    res.send(check);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});
/* - Création d'un prestataire - */
router.post('/:nom/:prenom/:email/:mdp/:tel/:salaire/ajoutPrestataire', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var nom = req.params.nom;
    var prenom = req.params.prenom;
    var email = req.params.email;
    var tel = req.params.tel;
    var mdp = req.params.mdp;
    var salaire = req.params.salaire;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Prestataire');
    await col.insertMany([{nom: nom, prenom: prenom, email: email, mdp: mdp, tel: tel, salaire: salaire}]);
    var check = await col.find({nom: nom, prenom: prenom, email: email, mdp: mdp, tel: tel, salaire: salaire}).toArray();
    res.send(check);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});
/* - Création d'un service - */
router.post('/:nom/:type/ajoutService', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var nom = req.params.nom;
    var type = req.params.type;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Service');
    await col.insert({nomService: nom, typeService: type});
    var check = await col.find({nomService: nom, typeService: type}).toArray();
    res.send(check);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});
/* - Création d'un service - */
router.post('/ajoutAnnonce', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var email = req.body.email;
    var serviceName = req.body.serviceName;
    var subServiceName = req.body.subServiceName;
    var serviceDescription = req.body.serviceDescription;
    var serviceAdresse = req.body.serviceAdresse;
    await client.connect();
    const db = client.db(dbName);
    const colClient = db.collection('Client');
    const colService = db.collection('Service');
    const colAnnonce = db.collection('Annonce');
    var checkClient = await colClient.find({email: email}).toArray();
    var checkService = await colService.find({nomService: subServiceName, typeService: serviceName}).toArray();
    var idClient = checkClient[0]._id;
    var idService = checkService[0]._id;
    await colAnnonce.insert({idClient: idClient, idService: idService, descriptionAnnonce: serviceDescription, detailAnnonce: serviceAdresse});

    var check = await colAnnonce.find().toArray();
    res.send(check);
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});
/* - Suppression d'un client - */
router.delete('/:email/:mdp/supprimerClient', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var email = req.params.email;
    var mdp = req.params.mdp;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Client');
    var findClient = await col.find({email: email, mdp: mdp});
    col.deleteOne({email: email, mdp: mdp});
    res.send("Client Supprimé");
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});
/* - Suppression d'un prestataire - */
router.delete('/:email/:mdp/supprimerPrestataire', async (req, res) => {
  try {
    // Connection URL
    const url = MONGODB_URI || 'mongodb://localhost:27017/spareAPI';
    // Database Name
    const dbName = 'spareAPI';
    const client = new MongoClient(url);
    var email = req.params.email;
    var mdp = req.params.mdp;
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection('Prestataire');
    var findClient = await col.find({email: email, mdp: mdp});
    col.deleteOne({email: email, mdp: mdp});
    res.send("Prestataire Supprimé");
    client.close();
  } catch (err) {
    //this will eventually be handled by your error handling middleware
    console.log(err.stack);
  }
});

module.exports = router;
