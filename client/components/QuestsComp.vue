<template>
  <div class="relative flex flex-col h-full flex-grow-0 bg-white w-full">
    <ModalImage :is-open="$store.state.display.showModal" :image="modalImage" />
    <div
      class="fixed top-0 w-full z-20 bg-white py-2 space-y-3 border-b-2 border-gray-100"
    >
      <div class="text-6xl block">Questionário</div>
      <div class="flex items-center space-x-2">
        <label for="area">Assunto:</label>
        <select
          id="area"
          v-model="currentArea"
          class="form-select appearance-none block w-64 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          name="area"
          multiple
        >
          <option value="all">TODOS</option>
          <option v-for="area in rankMemoryByTag" :key="area" :value="area[0]">
            {{ area[0].toUpperCase() }} / {{ area[1] }}
          </option>
        </select>

        <button
          type="button"
          class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          @click="setCurrentList"
        >
          Montar
        </button>
      </div>
    </div>

    <div class="flex flex-col h-full flex-grow-0 mt-32 w-full">
      <div
        class="z-10 bg-cover overflow-hidden overflow-y-auto flex-grow flex-shrink-0 w-full"
      >
        <QuestItem
          v-for="(item, index) in currentList"
          :key="index"
          :item="item"
          :index="index"
        />

        <div
          class="bg-red-100 rounded w-full h-16 flex justify-center items-center mb-2"
        >
          <span v-if="currentList.length > 0"> FIM </span>
          <span v-else> Selecione ao menos um item da lista de assuntos </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import quests from '../helpers/quests/index'

export default {
  data() {
    return {
      showModal: false,
      modalImage: '',
      apiQuests: [],
      currentArea: [],
      currentList: [],
      filterTags: [],
      listas: {
        ...quests
      }
    }
  },
  async fetch() {
    this.apiQuests = await fetch('http://localhost:3010/remember').then((res) =>
      res.json()
    )
  },
  computed: {
    areas() {
      return Object.keys(this.listas)
    },
    questions() {
      return (param) => this.listas[param]
    },
    disponibleTags() {
      let tags = []
      this.apiQuests.forEach((item) => {
        tags = tags.concat(item.assunto)
      })

      return [...new Set(tags)].sort()
    },
    rankMemoryByTag() {
      const rankItem = {}

      this.disponibleTags.forEach((item) => {
        const questionsWithTag = this.apiQuests.filter((itemQuest) =>
          itemQuest.assunto.includes(item)
        )

        rankItem[item] = questionsWithTag.reduce(
          (acc, quest) => acc + quest.memory,
          0
        )
      })
      return Object.entries(rankItem)
    }
  },
  mounted() {
    this.setRankMemoryByTag()
  },
  methods: {
    setRankMemoryByTag() {
      const rankItem = {}
      const q = this.apiQuests.filter((itemQuest) =>
        itemQuest.assunto.includes(itemQuest)
      )
      console.log(q)
      this.disponibleTags.forEach((item) => {
        const questionsWithTag = this.apiQuests.filter((itemQuest) =>
          itemQuest.assunto.includes('action')
        )

        rankItem[item] = questionsWithTag.reduce(
          (acc, quest) => acc + quest.memory,
          0
        )
      })
      return rankItem
    },

    startModal(image) {
      this.showModal = true
      this.modalImage = image
      this.$store.commit('display/SET_SHOW_MODAL', true)
    },
    setCurrentList() {
      if (this.currentArea.length === 0) {
        alert('Selecione pelo menos 1 item da lista de assuntos')
        return
      }

      if (this.currentArea.includes('all')) {
        this.currentList = this.apiQuests.sort(function (a, b) {
          if (a.memory > b.memory) {
            return 1
          }
          if (a.memory < b.memory) {
            return -1
          }
          return 0
        })
        return
      }

      this.currentList = this.apiQuests
        .filter((item) => {
          return this.compareArrayItems(this.currentArea, item.assunto)
        })
        .sort(function (a, b) {
          if (a.memory > b.memory) {
            return 1
          }
          if (a.memory < b.memory) {
            return -1
          }
          return 0
        })
    },
    compareArrayItems(arrUserSelected, arrQuestItemTag) {
      return arrUserSelected.some((item) => arrQuestItemTag.includes(item))
    }
  }
}
</script>
