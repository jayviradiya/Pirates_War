const express = require('express');
const AllRouter = express.Router();

const userRouter = require('./user-r');
const inventoryRouter = require('./inventory-r');
const cartRouter = require('./cart-r');
const shipRouter = require('./ship-r');
const currencyRouter = require('./currency-r');
const progressRouter = require('./progress-r');
const valletRouter = require('./vallet-r');
const eventRouter = require('./event-r');
const itemRouter = require('./itemPakage-r');
const battlePointRouter = require('./battlePoints-r');
const postRouter = require('./posts-r');
const newsRouter = require('./news-R');

AllRouter.use('/users', userRouter);
AllRouter.use('/inventories', inventoryRouter);
AllRouter.use('/cart', cartRouter);
AllRouter.use('/ship', shipRouter);
AllRouter.use('/currency', currencyRouter);
AllRouter.use('/progress', progressRouter);
AllRouter.use('/vallet', valletRouter);
AllRouter.use('/event' , eventRouter);
AllRouter.use('/items' , itemRouter);
AllRouter.use('/battle' , battlePointRouter);
AllRouter.use('/post' , postRouter);
AllRouter.use('/news' , newsRouter);

module.exports = AllRouter; 