module.exports = [
    {
        assunto: ['github', 'boas-praticas'],
        memory: 0,
        question: 'Cite 5 palavras-chave de Conventional Commits',
        answer: [
            'docs:  	Alterações apenas na documentação ',
            'feat:  	Um novo recurso',
            'fix:   	uma correção de bug',
            'refactor: Uma mudança de código que não corrige um bug nem adiciona um recurso',
            'chore: Mudanças no processo de construção ou ferramentas auxiliares e bibliotecas, como geração de documentação',
        ],
        link: ['https://www.conventionalcommits.org/pt-br/v1.0.0/',
            'https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines'],
        image: 'commit-messages.png',
    },
    {
        assunto: ['github', 'boas-praticas', 'ify-devs'],
        memory: 0,
        question: 'Cite 3 recomendações dos devs para criação de branchs.',
        answer: ['Crie branchs a partir da master atualizada',
            'Crie a partir da interface Github',
            'Nomeie com o número da issue, quando houver. Criando pela issue associa automáticamente.',
            'Certifique-se que vc está na pasta do projeto correto'
        ],
        link: [],
        image: 'criar-branch.png',
    }
]

