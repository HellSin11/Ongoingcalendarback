const express = require('express');
const OngoingController = require('../controllers/ongoingController')
const router = new express();

router.post('/ongoings', OngoingController.create);
router.get('/ongoings', OngoingController.getByOwner);
router.get('/ongoings/:id', OngoingController.getByOwner);
router.put('/ongoings', OngoingController.update);
router.delete('/ongoings/:name', OngoingController.delete);

module.exports = router;
