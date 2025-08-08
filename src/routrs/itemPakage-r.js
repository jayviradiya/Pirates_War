const express = require('express');
const router = express.Router();
const {
    getAllPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage
} = require('../controllers/itemPackages-c');

const upload = require('../middleware/upload'); 

router.post('/create', upload.single('imageUrl'), createPackage);
router.get('/list', getAllPackages);
router.get('/get/:id', getPackageById);
router.put('/update/:id', upload.single('imageUrl'), updatePackage);
router.delete('/delete/:id', deletePackage);

module.exports = router;
