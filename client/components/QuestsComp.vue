<!-- @format -->

<template>
  <div class="quest-comp flex flex-col h-screen flex-grow-0 bg-white w-full">
    <ModalImage :is-open="$store.state.display.showModal" :image="modalImage" />
    <div class="w-full py-2 space-y-3">
      <div class="px-2">
        <div class="text-6xl block">Questionário</div>

        <div class="h-auto flex flex-wrap items-center space-x-3">
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

          <button type="button" class="form-btn" @click="setCurrentList">
            Montar
          </button>

          <button
            type="buttons"
            class="form-btn"
            @click="setCurrentListOnlyNegative"
          >
            NEGATIVAS
          </button>

          <button type="button" class="form-btn" @click="setOnlyOptions">
            Opções
          </button>

          <div
            class="space-x-2 items-stretch flex mx-2 p-1 border border-gray-200 rounded text-center"
          >
            <input
              v-model="daysLong"
              class="w-20 h-10 border border-black rounded text-center"
              type="number"
              name="daysLong"
            />

            <button
              type="buttons"
              class="form-btn"
              @click="setCurrentListLongDays"
            >
              Não Vista há {{ daysLong }} dias ou mais
            </button>
          </div>
          <button type="buttons" class="form-btn" @click="reset">Reset</button>
        </div>
      </div>
    </div>

    <div
      class="quests-container h-full flex flex-col w-full overflow-hidden overflow-y-auto p-5"
    >
      <div
        v-if="false"
        class="quests-container h-full flex flex-col w-full overflow-hidden overflow-y-auto p-5"
      >
        <div class="relative h-3 w-3 ml-4 flex items-center">
          <span class="flex h-3 w-3">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-3 w-3 bg-purple-500"
            ></span>
          </span>
          Loading
        </div>
      </div>
      <QuestItem
        v-for="(item, index) in currentList"
        :key="index"
        :item="item"
        :index="index"
        :current-day="currentDay"
      />
    </div>
    <div
      class="bg-red-100 rounded w-full h-16 flex justify-center items-center mb-2"
    >
      <span v-if="currentList.length > 0">
        {{ currentList.length }} itens do teste atual
      </span>
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
      daysLong: 10,
      currentArea: [],
      currentList: [],
      filterTags: [],
    }
  },

  computed: {
    apiQuests() {
      return this.$store.state.display.items
    },
    getQuestionsByLongVisited() {
      return this.$store.getters['display/getQuestionsByLongVisited']
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
          .sort(this.sorter),
      ]
    },
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
    setOnlyOptions() {
      this.currentList = this.allListOrder.filter((item) =>
        item.assunto.includes('opcoes')
      )
    },
    reset() {
      this.currentList = []
      this.currentArea = []
    },
    setCurrentList() {
      if (this.currentArea.length === 0) {
        alert('Selecione pelo menos 1 item da lista de assuntos')
      } else if (this.currentArea.includes('all')) {
        this.currentList = [
          ...this.allListOrder.filter(
            (item) => !item.assunto.includes('opcoes')
          ),
        ]
      } else {
        this.currentList = this.assuntoListed
      }
    },
    setCurrentListLongDays() {
      if (this.currentArea.length === 0) {
        alert('Selecione pelo menos 1 item da lista de assuntos')
        return
      }

      let temp = []
      temp = this.getQuestionsByLongVisited.filter((item) => {
        return !item.assunto.includes('opcoes')
      })

      temp = temp.filter((item) => {
        return this.currentArea.includes('all')
          ? true
          : this.compareArrayItems(this.currentArea, item.assunto)
      })

      temp = temp.filter((item) => {
        return item.daysLong > this.daysLong
      })
      temp = temp.sort(function (a, b) {
        if (a.memory > b.memory) {
          return 1
        }
        if (a.memory < b.memory) {
          return -1
        }
        return 0
      })

      if (temp.length === 0) {
        alert('Não retornou itens')
      }

      this.currentList = temp
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
    },
  },
}
</script>

<style lang="postcss" scoped>
.form-btn {
  @apply h-10 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700    hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 

  focus:outline-none focus:ring-0 transition duration-150 ease-in-out;
}
</style>
