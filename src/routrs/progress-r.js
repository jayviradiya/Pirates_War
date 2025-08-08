const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progress-c');

router.post('/create', progressController.createOrUpdateProgress);
router.get('/getall', progressController.getAllProgress);
router.get('/get/:id', progressController.getProgressById);
router.put('/update/:id', progressController.updateProgress);
router.delete('/delete/:id', progressController.deleteProgress);

module.exports = router;
