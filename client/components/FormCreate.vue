<!-- @format -->

<template>
  <div class="bg-blue-100 w-full h-screen overflow-hidden overflow-y-auto">
    <form class="flex flex-col space-y-4 width-clamp rounded p-4">
      <h1 class="text-5xl block">Cadastro de Questão</h1>
      <textarea
        v-model="assunto"
        required
        name="assunto"
        cols="30"
        rows="3"
        placeholder="Assuntos tag"
      />
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
        rows="3"
        placeholder="Respostas"
      />
      <textarea
        v-model="link"
        name="link"
        cols="30"
        rows="3"
        placeholder="Links"
      />
      <input
        v-model="image"
        type="text"
        name="image"
        class="h-14"
        placeholder="Image file name"
      />

      <textarea
        v-model="images"
        name="images"
        cols="30"
        rows="3"
        placeholder="Múltiplas imagens"
      />

      <input
        v-model="lastDayVisited"
        type="text"
        name="lastDayVisited"
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
        <button class="form-button" type="button" @click="submit()">
          {{ `${questionItem._id ? 'Atualizar' : 'Cadastrar'}` }}
        </button>

        <button class="form-button" type="button" @click="clear()">
          limpar
        </button>

        <input v-model.trim="editingItemId" type="text" placeholder="id" />
        <button class="form-button" type="button" @click="showByid()">
          showByid
        </button>

        <!-- <button class="form-button" type="button" @click="updateQuestion()">
        Update
      </button> -->
      </div>

      <div
        class="w-full h-10"
        :class="{
          hidden: !lastCreatedStaus,
          'bg-red-200': lastCreatedStaus.includes('Não'),
          'bg-green-200': lastCreatedStaus.includes('Criado'),
        }"
      >
        {{ lastCreatedStaus }}
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lastCreatedStaus: '',
      memory: 0,
      question: '',
      image: '',
      images: '',
      link: '',
      assunto: '',
      answer: '',
      editingItemId: '',
      questionItem: {},
      lastDayVisited: '',
    }
  },
  computed: {
    getPayload() {
      const payload = {
        memory: 0,
        question: this.question,
        image: this.image,
        images: this.images.split(/\r?\n/).filter((i) => i),
        link: this.link.split(/\r?\n/).filter((i) => i),
        assunto: this.assunto.split(/\r?\n/).filter((i) => i),
        answer: this.answer.split(/\r?\n/).filter((i) => i),
      }
      if (this.editingItemId) payload._id = this.editingItemId
      return payload
    },
  },
  methods: {
    submit() {
      if (this.questionItem._id) {
        this.updateQuestion()
      } else {
        this.submitQuestion()
      }
    },
    async submitQuestion() {
      try {
        await this.$store.dispatch('display/create', this.getPayload)
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
        await this.$store.dispatch('display/update', this.getPayload)
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
      this.images = ''
      this.link = ''
      this.assunto = ''
      this.answer = ''
      this.lastCreatedStaus = ''
      this.editingItemId = ''
      this.memory = ''
      this.lastDayVisited = ''
      this.questionItem = {}
    },
    showByid() {
      const currentItem = this.$store.state.display.items.find(
        (item) => item._id === this.editingItemId.replace('', '')
      )

      if (!currentItem) return

      this.questionItem = { ...currentItem }
      this.question = currentItem.question
      this.image = currentItem.image
      this.images = currentItem.images.join('\r\n')
      this.link = currentItem.link.join('\r\n')
      this.assunto = currentItem.assunto.join('\r\n')
      this.answer = currentItem.answer.join('\r\n')
    },
  },
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
