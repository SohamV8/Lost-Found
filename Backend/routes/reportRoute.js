const { Lost, Found } = require('../models/Report');
const express = require('express');
const router = express.Router();

router.post('/reports/lost', async (req, res) => {
    try {
        const lostReport = new Lost(req.body);
        await lostReport.save();
        res.status(201).send(lostReport);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.post('/reports/found', async (req, res) => {
    try {
        const foundReport = new Found(req.body);
        await foundReport.save();
        res.status(201).send(foundReport);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET ALL 'LOST' ITEMS
router.get('/lost-items', async (req, res) => {
    try {
        const lostItems = await Lost.find({ status: false }); //ITEMS THAT HAVE NOT BEEN CLAIMED

        if (lostItems.length === 0) {
            return res.status(404).json({ message: 'No lost items found' });
        }

        res.status(200).json(lostItems);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
});

// GET ALL 'FOUND' ITEMS
router.get('/found-items', async (req, res) => {
    try {
        const foundItems = await Found.find({ status: false }); //ITEMS THAT HAVE NOT BEEN CLAIMED

        if (foundItems.length === 0) {
            return res.status(404).json({ message: 'No items found' });
        }

        res.status(200).json(foundItems);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
});


//CLAIMED ITEM
router.put('/update-status', async (req, res) => {
    const { email, reportId } = req.body;

    try {
        const report = await Report.findOneAndUpdate(
            { _id: reportId, email: email },
            { $set: { status: true } },
            { new: true }
        );

        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json({ message: 'Status updated successfully', report });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
});

module.exports = reportRoute;