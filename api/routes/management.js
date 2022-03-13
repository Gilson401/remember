const express = require('express');
const router = express.Router();
const QuestsModel = require('../models/quests');


/** Update this array obeying this example, so access this endpoint to update
 * later I'll complete the crud on client
 */
const questions = [
    {
        assunto: ['store', 'vuex', 'boas-praticas'],
        memory: 0,
        question: 'Cite 4 recomendações para escrita e uso de vuex-store',
        answer: [
            'Todos os métodos da store são apenas para lidar com seus próprios states',
            'Store de tipo CRUD não é o padrão para todas as stores.',
            'Só as mutations devem manipular a state',
            'Actions com responsabilidads únicas.',
        ],
        link: ['https://www.conventionalcommits.org/pt-br/v1.0.0/',
            'https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines'],
        image: '',
    },
]



router.post('/', async (req, res, next) => {
    try {
        const ids = []
        for await (let item of questions) {

            let newQuestItem = new QuestsModel(item)

            await newQuestItem.save()
            if (newQuestItem.id) {
                ids.push(newQuestItem.id)
            }
        }

        res.json(ids);
    } catch (err) {
        console.error(__filename, 'erro em post question', err.message)
        res.status(500).send({ "error": err.message })
    }
})


module.exports = router;