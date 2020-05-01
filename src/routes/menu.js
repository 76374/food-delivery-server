const express = require('express');

const router = express.Router();

router.get('/menu', (request, response, next) => {
    response.send('<h1>Hello there!</h1>')
});

module.exports = router;