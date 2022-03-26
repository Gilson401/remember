const express = require('express');
const router = express.Router();
const QuestsModel = require('../models/quests');
const { check, validationResult } = require('express-validator');


router.get('/', async (req, res, next) => {
    try {
        let nwatchingItems = await QuestsModel.find(req.query)
        res.json(nwatchingItems)
    } catch (err) {
        res.status(500).send({ "error": 'erro em get watch!' })
    }
})


router.post('/', [
    check('question').not().isEmpty(),
    check('assunto').not().isEmpty(),
    check('answer').not().isEmpty(),
], async (req, res, next) => {
    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        } else {

            let newQuestItem = new QuestsModel(req.body)

            await newQuestItem.save()
            if (newQuestItem.id) {
                res.json(newQuestItem);
            }
        }
    } catch (err) {
        console.error(__filename, 'erro em post question', err.message)
        res.status(500).send({ "error": err.message })
    }
})

router.patch('/:questId', [
    check('memory').not().isEmpty(),
], async (request, res, next) => {
    try {
        const id = request.params.questId

        let bodyRequest = request.body

        const update = { $set: bodyRequest }

        const updatedQuestion = await QuestsModel.findByIdAndUpdate(id, update, { new: true })
        if (updatedQuestion) {
            res.send(updatedQuestion)
        } else {
            res.status(404).send({ error: 'Não identificado ou atualizado' })
        }
    } catch (err) {
        res.status(500).send({ "error": err.message })
    }
})

router.delete('/:itemID', async (req, res, next) => {
    try {
        const id = req.params.itemID
        const QuestToDelete = await QuestsModel.find({ _id: id })
        if (QuestToDelete) {
            await QuestsModel.findOneAndDelete({ _id: id })
            res.json(QuestToDelete)
        } else {
            res.status(404).send({ "error": "Não existe esta ID" })
        }

    } catch (err) {

        res.status(500).send({ "error": "Não foi possível apager item de watch" })
    }
})



module.exports = router;
