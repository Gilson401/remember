<template>
  <form class="flex flex-col space-y-4 w-2/3 rounded bg-blue-100 p-4">
    <h1 class="text-6xl block">Form Cadastro Questão</h1>
    <textarea
      v-model="assunto"
      name="assunto"
      cols="30"
      rows="5"
      placeholder="Assuntos tag"
    ></textarea>
    <input
      v-model="question"
      type="text"
      name="question"
      placeholder="Questão"
      class="h-14"
    />
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
    <textarea
      v-model="answer"
      name="answer"
      cols="30"
      rows="5"
      placeholder="Respostas"
    ></textarea>
    <button
      class="ml-auto mb-2 bg-gray-500 text-white hover:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded w-28 shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      @click="submitQuestion()"
    >
      Cadastrar
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
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
      const payload = {
        memory: 0,
        question: this.question,
        image: this.image,
        link: this.link.split(/\r?\n/),
        assunto: this.assunto.split(/\r?\n/),
        answer: this.answer.split(/\r?\n/)
      }
      await this.$axios.post('http://localhost:3010/remember', payload)
    }
  }
}
</script>
