const express = require('express');
const router = express.Router();
const battlePointController = require('../controllers/battlePoints-c');

router.post('/create', battlePointController.createBattlePoint);
router.get('/getall', battlePointController.getAllBattlePoints);
router.get('/get/:id', battlePointController.getBattlePointById);
router.put('/update/:id', battlePointController.updateBattlePoint);
router.delete('/delete/:id', battlePointController.deleteBattlePoint);

module.exports = router;
