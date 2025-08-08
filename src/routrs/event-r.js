const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const eventController = require('../controllers/event-c');

router.post('/create', upload.single('image'), eventController.createEvent);
router.get('/getall', eventController.getAllEvents);
router.get('/filter/type/:type', eventController.getEventsByType);
router.get('/getevent/:id', eventController.getEventById);
router.put('/update/:id', upload.single('image'), eventController.updateEvent);
router.delete('/delete/:id', eventController.deleteEvent);

module.exports = router;
