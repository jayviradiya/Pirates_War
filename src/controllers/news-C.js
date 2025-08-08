const News = require('../models/news-M');

const createNews = async (req, res) => {
    try {
        if (!req.body.link) {
            return res.status(400).json({ message: 'Link is required' });
        }
        const news = await News.create(req.body);
        res.status(201).json({
            message: 'News created successfully',
            news
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const UpdateNews = async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getAllNews = async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        res.status(200).json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createNews,
    UpdateNews,
    getAllNews,
    getNewsById
};
