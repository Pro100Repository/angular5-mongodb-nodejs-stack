const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://admin:123456@ds243805.mlab.com:43805/cto', (err, db) => {
        if (err) return console.log(err);
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

//Check for user
router.post('/check', (req, res) => {
    let keys = {
        login: req.body.login,
        password: req.body.password
    };
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((data) => {
                if (keys.login == data[0].login && keys.password == data[0].password) {
                    response.data = true;
                } else {
                    response.data = false;
                }
                res.json(response);
            }).catch((err) => {
                sendError(err, res);
            });
    });
});

// Get all items
router.get('/items', (req, res) => {
    connection((db) => {
        db.collection('items')
            .find()
            .toArray()
            .then((items) => {
                response.data = items;
                res.json(response);
            }).catch((err) => {
                sendError(err, res);
            });
    });
});

//Get item by id
router.get('/items/:id', (req, res) => {
    let id = { '_id': new ObjectID(req.params.id) };
    connection((db) => {
        db.collection('items')
            .findOne(id)
            .then((res) => {
                response.data = res;
                res.json(response);
            }).catch((err) => {
                sendError(err, res);
            });
    });
});

// Post new item
router.post('/items', (req, res) => {
    let item = {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price
    };
    connection((db) => {
        db.collection('items')
            .insert(item)
            .then((items) => {
                response.data = items;
                res.json(response);
            }).catch((err) => {
                sendError(err, res);
            });
    });
});

// Put new item
router.put('/items/:id', (req, res) => {
    let id = { '_id': new ObjectID(req.params.id) };
    let item = {
        title: 'test2'
    };

    connection((db) => {
        db.collection('items')
            .update(id, item)
            .then((items) => {
                response.data = items;
                res.json(response);
            }).catch((err) => {
                sendError(err, res);
            });
    });
});

//Delete item by id
router.delete('/items/:id', (req, res) => {
    let id = { '_id': new ObjectID(req.params.id) };
    connection((db) => {
        db.collection('items')
            .remove(id).catch((err) => {
                sendError(err);
            });
    });
});

module.exports = router;