const Market = require('../models/market-m');

exports.createMarket = async (req, res) => {
  try {
    const {
      name,
      title,
      description,
      price,
      type,
      currencyId,
      isVisible
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Field "name" is required.' });
    }

    if (!title) {
      return res.status(400).json({ error: 'Field "title" is required.' });
    }

    if (price === undefined || price === null) {
      return res.status(400).json({ error: 'Field "price" is required.' });
    }

    if (!type) {
      return res.status(400).json({ error: 'Field "type" is required.' });
    }

    if (!['elite', 'currency'].includes(type)) {
      return res.status(400).json({ error: 'Invalid "type" value. Must be "elite" or "currency".' });
    }

    if (type !== 'currency' && !currencyId) {
      return res.status(400).json({ error: '"currencyId" is required for type "elite".' });
    }

    const market = new Market({
      name,
      title,
      description,
      price,
      type,
      currencyId: type !== 'currency' ? currencyId : null,
      isVisible: isVisible !== undefined ? isVisible : true
    });

    await market.save();
    res.status(201).json(market);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMarkets = async (req, res) => {
  try {
    const markets = await Market.find().populate('currencyId');
    res.status(200).json(markets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMarketById = async (req, res) => {
  try {
    const market = await Market.findById(req.params.id).populate('currencyId');
    if (!market) return res.status(404).json({ error: 'Market item not found' });
    res.status(200).json(market);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMarket = async (req, res) => {
  try {
    const marketId = req.params.id;
    const {
      name,
      title,
      description,
      price,
      type,
      currencyId,
      isVisible
    } = req.body;

    const existingMarket = await Market.findById(marketId);
    if (!existingMarket) {
      return res.status(404).json({ error: 'Market item not found.' });
    }

    const updateData = {
      name: name !== undefined ? name : existingMarket.name,
      title: title !== undefined ? title : existingMarket.title,
      description: description !== undefined ? description : existingMarket.description,
      price: price !== undefined ? price : existingMarket.price,
      type: type !== undefined ? type : existingMarket.type,
      currencyId:
        (type === 'elite' || existingMarket.type === 'elite')
          ? (currencyId || existingMarket.currencyId)
          : null,
      isVisible: isVisible !== undefined ? isVisible : existingMarket.isVisible
    };

    const updatedMarket = await Market.findByIdAndUpdate(marketId, updateData, { new: true });
    res.status(200).json(updatedMarket);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMarket = async (req, res) => {
  try {
    const deleted = await Market.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Market item not found' });
    res.status(200).json({ message: 'Market item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMarketsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const { isVisible } = req.query;

    // Validate type
    if (!['elite', 'currency'].includes(type)) {
      return res.status(400).json({ error: 'Invalid type. Must be "elite" or "currency".' });
    }

    // Build filter query
    const filter = { type };

    if (isVisible !== undefined) {
      if (isVisible === 'true' || isVisible === 'false') {
        filter.isVisible = isVisible === 'true';
      } else {
        return res.status(400).json({ error: '"isVisible" must be "true" or "false".' });
      }
    }

    const markets = await Market.find(filter).populate('currencyId');
    res.status(200).json(markets);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
