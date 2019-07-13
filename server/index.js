const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('../database-mysql');
const mysql = require('mysql');
const mysqlConfig = require('../database-mysql/config.js');

const app = express();
const PORT = 3030;
const connection = mysql.createConnection(mysqlConfig);

connection.connect((err) => {
	if (err) {
		console.log('error connecting to database ' + err);
	}
});

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

const clientDistFolder = path.join(__dirname, '/..', '/client/dist');
const publicFolder = path.join(__dirname, '/..', '/public');

app.use('/static', express.static(publicFolder));

app.use(express.static(clientDistFolder));
app.use('/products/:id', express.static(clientDistFolder));

app.get('/product/:id', (req, res) => {
	console.log('%s %s %s', req.method, req.url, req.path);
	console.log(req.params.id);
	var requestedId = req.params.id.replace(':', '');

	db.getProductDataById(requestedId, (err, results) => {
		if (err) {
			console.log(' server issue get selectId ');
			res.status(400).send(err);
		} else {
			res.status(200).send(JSON.stringify(results));
		}
	});
});

app.post('/item', (req, res) => {
	var postItem = req.body;
	connection.query('INSERT INTO item SET ?', postItem, (err, results, fields) => {
		if (err) {
			console.log(' issue posting to item table ');
			res.status(400).send(err);
		} else {
			res.status(200).send(JSON.stringify(results));
		}
	});
});

app.post('/itemavail', (req, res) => {
	var postItemAvail = req.body;
	console.log(req.body);
	connection.query('INSERT INTO item_availability SET ?', postItemAvail, (err, results, fields) => {
		if (err) {
			console.log(' issue posting to item_availability table ');
			res.status(400).send(err);
		} else {
			res.status(200).send(JSON.stringify(results));
		}
	});
});

app.post('/user', (req, res) => {
	var postUser = req.body;
	console.log(req.body);
	connection.query('INSERT INTO user SET ?', postUser, (err, results, fields) => {
		if (err) {
			console.log(' issue posting to user table ');
			res.status(400).send(err);
		} else {
			res.status(200).send(JSON.stringify(results));
		}
	});
});

app.post('/vendor', (req, res) => {
	var postVendor = req.body;
	console.log(req.body);
	connection.query('INSERT INTO vendor SET ?', postVendor, (err, results, fields) => {
		if (err) {
			console.log(' issue posting to vendor table ');
			res.status(400).send(err);
		} else {
			res.status(200).send(JSON.stringify(results));
		}
	});
});

// app.put('/item', (req, res) => {
// 	console.log('%s %s %s', req.method, req.url, req.path);
// 	console.log(req.params.id);
// 	res.send(`Hi ${req.params.id}`);
// });

// app.delete('/product/:id', (req, res) => {
// 	console.log('%s %s %s', req.method, req.url, req.path);
// 	console.log(req.params.id);
// 	res.send(`Hello ${req.params.id}`);
// });

app.listen(PORT, () => {
	console.log(`Open http://localhost:${PORT}`);
});
