const { text } = require('body-parser');
const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/', (req, res) =>{
    const userFilter = req.query.user || null;
    controller.getAllMessages(userFilter)
        .then((data) => {
            response.success(req, res, data);
        })
        .catch((error) => {
            response.error(req, res, error, error.status);
        });
    
});

router.post('/', (req, res) =>{
    
    controller.addMessage(req.body.user, req.body.message)
        .then((data) => {
            response.success(req, res, data);
        })
        .catch((error) => {
            response.error(req, res, error, error.status);
        });
});

router.patch('/:id', (req, res) =>{
    const id = req.params.id;
    const text = req.body.message;
    controller.updateMessage(id, text)
        .then((data) => {
            response.success(req, res, data);
        })
        .catch((error) => {
            response.error(req, res, error, error.status);
        });
});

router.delete('/', (req, res) =>{
    let data = 'Message was deleted';
    response.success(req, res, data);
});

module.exports = router;