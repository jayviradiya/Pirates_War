const express = require('express');

const router = express.Router();

const newsController = require('../controllers/news-C');

router.post('/create', newsController.createNews);
router.get('/getall', newsController.getAllNews);
router.get('/get/:id', newsController.getNewsById);
router.put('/update/:id', newsController.UpdateNews);

module.exports = router;