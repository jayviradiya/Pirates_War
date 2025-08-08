const express = require("express");
const router = express.Router();
const logbookController = require("../controllers/logBook-c");

router.post("/create", logbookController.createLog);        
router.get("/list", logbookController.getLogs);           
// router.get("/list/:id", logbookController.getLogById);     
// router.put("/update/:id", logbookController.updateLog);      
// router.delete("/:id", logbookController.deleteLog);   

module.exports = router;
