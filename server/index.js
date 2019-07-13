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

app.put('/item', (req, res) => {
	connection.query('UPDATE item SET name= ? WHERE id= ?', [ req.body.name, req.body.id ], (err, results, fields) => {
		if (err) {
			console.log(' issue editing item table ');
			res.status(400).send(err);
		} else {
			res.status(200).send(JSON.stringify(results));
		}
	});
});

app.put('/itemavail', (req, res) => {
	connection.query(
		'UPDATE item_availability SET item_id= ?, vendor_id= ?, items_condition= ?, price= ?, quantity_available= ?, amz_holds_stock= ?, free_returns= ?, ship_from_zipcode= ? WHERE id= ?',
		[
			req.body.item_id,
			req.body.vendor_id,
			req.body.items_condition,
			req.body.price,
			req.body.quantity_available,
			req.body.amz_holds_stock,
			req.body.free_returns,
			req.body.ship_from_zipcode,
			req.body.id
		],
		(err, results, fields) => {
			if (err) {
				console.log(' issue editing item_availability table ');
				res.status(400).send(err);
			} else {
				res.status(200).send(JSON.stringify(results));
			}
		}
	);
});

app.put('/user', (req, res) => {
	connection.query(
		'UPDATE user SET name= ?, email= ?, default_address_zip= ? WHERE id= ?',
		[ req.body.name, req.body.email, req.body.default_address_zip, req.body.id ],
		(err, results, fields) => {
			if (err) {
				console.log(' issue editing user table ');
				res.status(400).send(err);
			} else {
				res.status(200).send(JSON.stringify(results));
			}
		}
	);
});

app.put('/vendor', (req, res) => {
	connection.query(
		'UPDATE vendor SET name= ?, amz_holds_stock= ?, free_returns= ?, ships_on_saturday= ?, ships_on_sunday= ?, ships_from_zipcode= ?, status= ? WHERE id= ?',
		[
			req.body.name,
			req.body.amz_holds_stock,
			req.body.free_returns,
			req.body.ships_on_saturday,
			req.body.ships_on_sunday,
			req.body.ships_from_zipcode,
			req.body.status,
			req.body.id
		],
		(err, results, fields) => {
			if (err) {
				console.log(' issue editing vendor table ');
				res.status(400).send(err);
			} else {
				res.status(200).send(JSON.stringify(results));
			}
		}
	);
});

app.delete('/item', (req, res) => {
	connection.query('DELETE FROM item WHERE id= ?', [ req.body.id ], (err, results, fields) => {
		if (err) {
			console.log(' issue deleting item from table ');
			res.status(400).send(err);
		} else {
			res.status(200).send(' item record has been deleted ');
		}
	});
});

app.delete('/itemavail', (req, res) => {
	connection.query('DELETE FROM item_availability WHERE id= ?', [ req.body.id ], (err, results, fields) => {
		if (err) {
			console.log(' issue deleting from table ');
			res.status(400).send(err);
		} else {
			res.status(200).send(' record has been deleted ');
		}
	});
});

app.delete('/user', (req, res) => {
	connection.query('DELETE FROM user WHERE id= ?', [ req.body.id ], (err, results, fields) => {
		if (err) {
			console.log(' issue deleting user from table ');
			res.status(400).send(err);
		} else {
			res.status(200).send(' user record has been deleted ');
		}
	});
});

app.delete('/vendor', (req, res) => {
	connection.query('DELETE FROM vendor WHERE id= ?', [ req.body.id ], (err, results, fields) => {
		if (err) {
			console.log(' issue deleting vendor from table ');
			res.status(400).send(err);
		} else {
			res.status(200).send(' vendor record has been deleted ');
		}
	});
});

app.listen(PORT, () => {
	console.log(`Open http://localhost:${PORT}`);
});
