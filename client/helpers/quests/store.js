module.exports = [
    {
        assunto: ['store', 'vuex', 'boas-praticas'],
        memory: 0,
        question: 'Cite X recomendações para escrita e uso de vuex-store',
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
    {
        assunto: ['store', 'vuex'],
        memory: 0,
        question: 'Qual a diferença ente as delcarações de State export const state = () => {} e export function state() {}?',
        answer: [
            '',
            '',
        ],
        link: [],
        image: '',
    },
    {
        assunto: ['store', 'vuex', 'getters'],
        memory: 0,
        question: 'Cite X recomendações para criação de gettes',
        answer: [
            'Inicie o nome com get.',
            'Se o retorno não for um state trabalhado não precisa criar getter.',
        ],
        link: [],
        image: '',
    }
]


