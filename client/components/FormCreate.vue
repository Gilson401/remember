<template>
  <form class="flex flex-col space-y-4 width-clamp rounded bg-blue-100 p-4">
    <h1 class="text-6xl block">Form Cadastro Questão</h1>
    <textarea
      v-model="assunto"
      required
      name="assunto"
      cols="30"
      rows="5"
      placeholder="Assuntos tag"
    ></textarea>
    <input
      v-model="question"
      required
      type="text"
      name="question"
      placeholder="Questão"
      class="h-14"
    />
    <textarea
      v-model="answer"
      required
      name="answer"
      cols="30"
      rows="5"
      placeholder="Respostas"
    ></textarea>
    <textarea
      v-model="link"
      name="link"
      cols="30"
      rows="5"
      placeholder="Links"
    ></textarea>
    <input
      v-model="image"
      type="text"
      name="image"
      class="h-14"
      placeholder="Image file name"
    />

    <div>
      <button
        class="inline mb-2 bg-gray-500 text-white hover:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded w-28 shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        @click="submitQuestion()"
      >
        Cadastrar
      </button>

      <button
        class="inline mb-2 bg-gray-500 text-white hover:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded w-28 shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        @click="clear()"
      >
        limpar
      </button>
    </div>

    <div
      class="w-full h-10"
      :class="{
        hidden: !lastCreatedStaus,
        'bg-red-200': lastCreatedStaus.includes('Não'),
        'bg-green-200': lastCreatedStaus.includes('Criado')
      }"
    >
      {{ lastCreatedStaus }}
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      lastCreatedStaus: '',
      memory: 0,
      question: '',
      image: '',
      link: '',
      assunto: '',
      answer: ''
    }
  },
  methods: {
    async submitQuestion() {
      try {
        const payload = {
          memory: 0,
          question: this.question,
          image: this.image,
          link: this.link.split(/\r?\n/),
          assunto: this.assunto.split(/\r?\n/),
          answer: this.answer.split(/\r?\n/)
        }
        const persistedQuestion = await this.$axios.post(
          'http://localhost:3010/remember',
          payload
        )

        const { _id } = persistedQuestion.data
        this.lastCreatedStaus = `Criado ${_id}: ${persistedQuestion.data.question}`
        alert(this.lastCreatedStaus)
      } catch (error) {
        alert('Erro no cadastro')
        this.lastCreatedStaus = `Não Cadastrado ${this.question} `
      }
    },
    clear() {
      this.question = ''
      this.image = ''
      this.link = ''
      this.assunto = ''
      this.answer = ''
      this.lastCreatedStaus = ''
    }
  }
}
</script>
<style lang="postcss" scoped>
.width-clamp {
  width: clamp(300px, 60vw, 1000px);
}
</style>
