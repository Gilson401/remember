module.exports = [
    {
        assunto: ['linter', 'cleancode'],
        memory: 0,
        question: 'Que consideração existe sobre o linter?',
        answer: ['Passe sempre o linter, e não precisa ser apenas antes de fazer a PR.']
    },
    {
        assunto: ['linter', 'cleancode', 'javascript'],
        memory: 0,
        question: 'Qual a recomendação sobre chamada js no elemento?',
        answer: ['Use o mínimo de javascript dentro dos templates/componentes']
    },
    {
        assunto: ['css', 'cleancode'],
        memory: 0,
        question: 'Cite 5 recomendações para uso de classes de estilo em vue, tailwind',
        answer: [
            'Usar apenas um @apply por classe,',
            'Sempre usar ailwind classe se existir uma que atenda,',
            'Só declare novas classes se for usar repetidas vezes,',
            'Use a classe do guia de estilo',
            'Apague classes não usadas'
        ]
    },
    {
        assunto: ['testes'],
        memory: 0,
        question: 'Cite 4 razões para testar antes',
        answer: [
            'Evitar testar apenas cenários perfeitos/de sucesso',
            'Evita relacionamento afetivo com o código',
            'Evita excesso de dependências',
            'Evita procastinar o teste já que o teste é parte intrínseca.'],
        image: 'testar-antes.png'
    },
    {
        assunto: ['testes'],
        memory: 0,
        question: 'Segundo o dev senior, o que deve ser testado num .vue e como? 4 itens',
        answer: [
            'props: passar uma prop e checar se o efeito esperado ocorreu.',
            'emit: dispare o trigger do emit e cheque se as consequencias ocorreram como previsto',
            'slots: confirme se o slot (stub) foi renderizado e se algum efeito previsto para ele ocorreu',
            'Até segunda ordem, se não tiver nenhum dos três acima, não precisa testar.'],
    },
    {
        assunto: ['testes', 'store', 'vuex', 'componentes'],
        memory: 0,
        question: 'Cite 3 recomendações do senior para vuex store no teste de componente.',
        answer: [
            'A sintaxe deve ser com módulos objetos namespaced.',
            'A store mockada não precisa retornar dados, é criada apenas para não quebrar.',
            'O teste do componente não deve depender de nada externo, logo pode colocar mock de store.',
        ],
    },
    {
        assunto: ['testes'],
        memory: 0,
        question: 'Cite x observações correlatas a testes e módulos',
        answer: [
            'Pode refatorar o código do colega sim caso o teste indique esta necessidade',
        ],
    },
    {
        assunto: ['componentes'],
        memory: 0,
        question: 'Cite 3 pontos sobre necessidade de criação de componentes',
        link: ['https://br.vuejs.org/v2/style-guide/index.html'],
        answer: [
            'Evite criar componentes novos se já existe um com mesmo propósito em nosso pacote de componentes.',
            'Evite criar componente se for usado em apenas um módulo.',
            'Componente usado num único módulo só se este componente precisar e usar de variações por  props.',
        ],
    },
    {
        assunto: ['componentes'],
        memory: 0,
        question: 'Cite 7 pontos sobre nomenclatura de componentes',
        link: ['https://br.vuejs.org/v2/style-guide/index.html'],
        answer: [
            'Nomes de componentes devem ser MultiPalavras. Ex.: CardProfile.vue',
            'Nome de files de componentes single-file devem ser PascalCaseComponent.vue ',
            'Se um componente é base para outros, o nome deve indicar, ex: BaseButton.vue.',
            'Nomeie TheUniqueComponente.vue somente utilizado uma vez a cada página.',
            'Nomes indica acoplamento, ie. componente filho só faz sentido dentro de um pai específico: FatherSonComponent.vue',
            'Use hierarquia no nome. Ruim: ClearSearchButton.vue / Bom:SearchButtonClear.vue',
            'O nome do componente deve ser com palavras completas. Não use abreviaturas. Bom: UserProfileOptions.vue. Ruim: UProfOpts.vue'
        ],
    },
    {
        assunto: ['componentes', 'html', 'template'],
        memory: 0,
        question: 'Quais são as 3 orientações para invocação de componente na escrita da parte html no vuecli e cdn?',
        link: ['https://br.vuejs.org/v2/style-guide/index.html'],
        answer: [
            'Em files.vue (vue-cli) são válidos: <MyComponent/> <my-component></my-component>',
            'Em vue cdn* usar <my-component></my-component>',
            'Chame com auto fechamento <AutoClose/> se o componente não tiver conteúdo '
        ],

    },
    {
        assunto: ['componentes', 'html', 'template', 'props'],
        memory: 0,
        question: 'Mencione 3 recomendações sobre assinatura e invocação de props',
        link: ['https://br.vuejs.org/v2/style-guide/index.html'],
        image: 'recomendacao-props.png',
        answer: [
            'A assinatura da prop deve ser camelCase: props: {greetingText: String}',
            'A invocação da prop deve ser kebab-case quando cabível: <WelcomeMessage greeting-text="hi"/>',
            'Cada invocação de prop de um componente deve ficar numa linha. Evite <MyComponent foo="a" bar="b" baz="c"/>'
        ],
    },
    {
        assunto: ['componentes', 'javascript', 'computed'],
        memory: 0,
        question: 'Qual a recomendação para escrita de computeds?',
        link: ['https://br.vuejs.org/v2/style-guide/index.html'],
        answer: [
            'Computeds devem ter sua lógica preferencialmente numa linha apenas',
            'Se um computed precisar de mais linhas crie outros computeds'
        ],
    },
    {
        assunto: ['nomenclaturas', 'javascript', 'css', 'cleancode'],
        memory: 0,
        question: 'Cite  10 recomendações para criação de nomes de maneira geral.',
        answer: [
            'Evite nomes redundantes com contexto. Ex.: page cars.vue contendo um .cars-label{...}',
            'O nome deve indicar exatamente o que ele faz/guarda. Não faça pegadinhas',
            'Não tenha receio (não tenha mesmo) de usar nomes grandes',
            'Use verbos get e set para métodos e funções: getName/setName ',
            'Use substantivos para variáveis, classes e objetos: const name/ class Name',
            'Cuidados com nomes reservados da linguagem',
            'Não use nomes misteriosos ou que só fazem sentido para quem já conhece o projeto',
            'Evite nomes parecidos para objetivos diferentes: getUserData vs getUserInfo',
            'Use nomes que facilitem a busca (distinções de nomes claras dão melhores matches na busca)',
            'Escolha palavras-conceito únicas: createUser vs generateMap. Create e Generate tem o mesmo sentido que é criar. Escolha um padrão.'],
    },
    {
        assunto: ['componentes', 'vue', 'slots'],
        memory: 0,
        question: 'Cite 4 recomendações para slots em vue',
        answer: [
            'Assinatura de um slot default não precisa de name: <slot />',
            'Assinatura de um slot não default precisa de name: <slot name="slotName"/>',
            'Para invocar uso de um slot padrão não precisa usar sequer #default ou <template>. Todo childrem se slot explícito vai para o default',
            'Invocar slot nomeado sempre com uso se template: <template #slotName> <YourContent/> </template>'
        ],
    }


]
