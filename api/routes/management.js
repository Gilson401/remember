const express = require('express');
const router = express.Router();
const QuestsModel = require('../models/quests');
const { PaginationParameters } = require('mongoose-paginate-v2');


router.get('/', async (req, res, next) => {

    try {
        QuestsModel.paginate(...new PaginationParameters(req).get()).then((result) => {
            res.json(result)
        });

    } catch (error) {
        res.status(500).json({ error })
    }
})


module.exports = router;
