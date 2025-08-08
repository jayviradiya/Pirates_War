const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

//add inport
const ConnectDB = require('./src/config/db');
const AllRouter = require('./src/routrs/index');

ConnectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/upload', express.static(path.join(__dirname, 'public/uploads')));
// routers
app.use('/api' , AllRouter);

//index router
app.get("/", (req , res) => {
    res.json({message: "Welcom to an Game Backend API's"});
});

//for undefind router
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found , Plase check Path!"
    });
});

//start the server
app.listen(PORT, () => {
    console.log(`Server Running On http://localhost:${PORT}`);
})


