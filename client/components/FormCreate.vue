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
    <input
      v-model="lastDayVisited"
      type="text"
      name="image"
      class="h-14"
      placeholder="lastday"
    />
    <input
      v-model="memory"
      type="number"
      name="image"
      class="h-14"
      placeholder="memory point"
    />

    <div>
      <button class="form-button" type="button" @click="submitQuestion()">
        Cadastrar
      </button>

      <button class="form-button" type="button" @click="clear()">limpar</button>

      <input v-model="editingItemId" type="text" placeholder="id" />
      <button class="form-button" type="button" @click="showByid()">
        showByid
      </button>

      <button class="form-button" type="button" @click="updateQuestion()">
        update
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
      answer: '',
      editingItemId: '',
      questionItem: {},
      lastDayVisited: ''
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
        await this.$store.dispatch('display/create', payload)
        const { _id } = this.$store.state.display.lastPersistedItem
        this.lastCreatedStaus = `Criado ${_id}: ${this.question}`
        alert(this.lastCreatedStaus)
      } catch (error) {
        alert('Erro no cadastro')
        this.lastCreatedStaus = `Não Cadastrado ${this.question} `
      }
    },
    async updateQuestion() {
      if (!this.editingItemId) {
        alert('É necessário informar um id para editar uma questão.')
      }
      try {
        const payload = {
          memory: 0,
          question: this.question,
          image: this.image,
          link: this.link.split(/\r?\n/),
          assunto: this.assunto.split(/\r?\n/),
          answer: this.answer.split(/\r?\n/),
          _id: this.editingItemId
        }
        await this.$store.dispatch('display/update', payload)
        const { _id } = this.$store.state.display.lastPersistedItem
        this.lastCreatedStaus = `Atualizado ${_id}: ${this.question}`
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
      this.editingItemId = ''
      this.memory = ''
      this.lastDayVisited = ''
    },
    showByid() {
      const currentItem = this.$store.state.display.items.find(
        (item) => item._id === this.editingItemId.replace('', '')
      )

      if (!currentItem) return

      this.questionItem = { ...currentItem }
      this.question = currentItem.question
      this.image = currentItem.image
      this.link = currentItem.link.join('\r\n')
      this.assunto = currentItem.assunto.join('\r\n')
      this.answer = currentItem.answer.join('\r\n')
    }
  }
}
</script>
<style lang="postcss" scoped>
.width-clamp {
  width: clamp(300px, 60vw, 1000px);
}
input,
textarea {
  @apply px-2;
}

.form-button {
  @apply inline mb-2 bg-gray-500 text-white hover:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded w-28 shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150;
}
</style>
