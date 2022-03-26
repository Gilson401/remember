<template>
  <div class="quest-comp flex flex-col h-screen flex-grow-0 bg-white w-full">
    <ModalImage :is-open="$store.state.display.showModal" :image="modalImage" />
    <div class="w-full py-2 space-y-3">
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
          <option
            v-for="(area, index) in tagsSortedByMemoryPoint"
            :key="index"
            :value="area[0]"
          >
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

        <button
          type="button"
          class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          @click="setCurrentListOnlyNegative"
        >
          NEGATIVAS
        </button>
      </div>
    </div>

    <div
      class="quests-container h-full flex flex-col w-full overflow-hidden overflow-y-auto p-5"
    >
      <div class="quest-items">
        <QuestItem
          v-for="(item, index) in currentList"
          :key="index"
          :item="item"
          :index="index"
          :current-day="currentDay"
        />
      </div>
    </div>
    <div
      class="bg-red-100 rounded w-full h-16 flex justify-center items-center mb-2"
    >
      <span v-if="currentList.length > 0"> FIM </span>
      <span v-else> Selecione ao menos um item da lista de assuntos </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      modalImage: '',
      //   apiQuests: [],
      currentArea: [],
      currentList: [],
      filterTags: []
    }
  },
  //   async fetch() {
  //     this.apiQuests = await fetch('http://localhost:3010/remember').then((res) =>
  //       res.json()
  //     )
  //   },

  computed: {
    apiQuests() {
      return this.$store.state.display.items
    },
    currentDay() {
      return new Date().toISOString().split('T')[0]
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
    },
    tagsSortedByMemoryPoint() {
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
      return Object.entries(rankItem).sort(function (a, b) {
        if (a[1] > b[1]) {
          return 1
        }
        if (a[1] < b[1]) {
          return -1
        }
        return 0
      })
    },
    allListOrder() {
      return [...this.apiQuests].sort(this.sorter)
    },
    assuntoListed() {
      return [
        ...this.apiQuests
          .filter((item) => {
            return this.compareArrayItems(this.currentArea, item.assunto)
          })
          .sort(this.sorter)
      ]
    }
  },
  mounted() {
    this.setRankMemoryByTag()
  },
  methods: {
    sorter(a, b) {
      if (a.memory > b.memory) {
        return 1
      }
      if (a.memory < b.memory) {
        return -1
      }
      return 0
    },
    setRankMemoryByTag() {
      const rankItem = {}

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
        this.currentList = this.allListOrder
        return
      }

      this.currentList = this.assuntoListed
    },
    setCurrentListOnlyNegative() {
      this.currentList = this.apiQuests
        .filter((item) => {
          return item.memory < 0 && !item.assunto.includes('opcoes')
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
