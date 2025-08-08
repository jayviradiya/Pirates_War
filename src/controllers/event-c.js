const Event = require('../models/event-m');

exports.createEvent = async (req, res) => {
    try {
        const { title, description, typeOfSlider } = req.body;
        const image = req.file?.filename;

        if (!title || !description || !typeOfSlider) {
            return res.status(400).json({ success: false, message: 'Title, description, and typeOfSlider are required.' });
        }

        if (!['Main', 'Second'].includes(typeOfSlider)) {
            return res.status(400).json({ success: false, message: 'typeOfSlider must be either "Main" or "Second".' });
        }

        const newEvent = new Event({ title, description, typeOfSlider, image });
        await newEvent.save();

        res.status(201).json({ success: true, message: 'Event created successfully.', data: newEvent });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error while creating event.', error: error.message });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: events.length, data: events });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error while fetching events.', error: error.message });
    }
};

exports.getEventsByType = async (req, res) => {
    try {
        const { type } = req.params;

        if (!['Main', 'Second'].includes(type)) {
            return res.status(400).json({ success: false, message: 'Invalid type. Must be "Main" or "Second".' });
        }

        const events = await Event.find({ typeOfSlider: type }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: events.length, data: events });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error while fetching events by type.', error: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found.' });
        }

        res.status(200).json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error while fetching event.', error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { title, description, typeOfSlider } = req.body;
        const updateFields = {};

        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (typeOfSlider) {
            if (!['Main', 'Second'].includes(typeOfSlider)) {
                return res.status(400).json({ success: false, message: 'Invalid typeOfSlider. Must be "Main" or "Second".' });
            }
            updateFields.typeOfSlider = typeOfSlider;
        }

        if (req.file?.filename) updateFields.image = req.file.filename;

        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true });

        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: 'Event not found.' });
        }

        res.status(200).json({ success: true, message: 'Event updated successfully.', data: updatedEvent });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error while updating event.', error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const deleted = await Event.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Event not found.' });
        }

        res.status(200).json({ success: true, message: 'Event deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error while deleting event.', error: error.message });
    }
};
