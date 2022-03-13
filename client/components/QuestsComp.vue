<template>
  <div class="flex flex-col h-full flex-grow-0 bg-white w-full">
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
          <option v-for="area in disponibleTags" :key="area" :value="area">
            {{ area.toUpperCase() }}
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
        <div
          v-for="(item, index) in currentList"
          :key="index"
          class="p-2 my-4 rounded bg-blue-200 w-full shadow-sm"
        >
          <p class="ml-11 mb-2 font-bold">
            Index: {{ index }}, Tags:
            <span
              v-for="(tag, tagIndex) in item.assunto"
              :key="tagIndex"
              class="mr-2 text-base inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-gray-200 text-gray-700 rounded"
            >
              {{ tag }}</span
            >
            , Memory Points: {{ item.memory }}
          </p>
          <details>
            <summary class="mb-2 text-2xl">{{ item.question }}</summary>

            <ul class="ml-11 mb-2">
              <li v-for="(ritem, rindex) in item.answer" :key="rindex">
                {{ rindex + 1 }} - {{ ritem }}
              </li>
            </ul>

            <div v-if="item.link && item.link.length > 0">
              <ul class="my-2">
                <li v-for="(link, i) in item.link" :key="i">
                  <a
                    :href="link"
                    target="_blank"
                    class="inline-block ml-11 text-blue-400 font-bold"
                  >
                    &#127760; {{ link }}
                  </a>
                </li>
              </ul>
            </div>

            <img
              v-if="item.image"
              class="ml-11 mb-2"
              :src="require(`~/assets/${item.image}`)"
              :alt="item.image"
            />

            <div class="flex w-full content-center h-10">
              <button
                class="ml-11 mb-2 bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                @click="updateQuestMemoryPoint(1, item)"
              >
                Acertou
              </button>
              <button
                class="ml-11 mb-2 bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                @click="updateQuestMemoryPoint(-1, item)"
              >
                Errou
              </button>

              <button
                class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ml-auto mb-1 ease-linear transition-all duration-150"
                type="button"
                @click="deleteQuestItem(item)"
              >
                Delete
              </button>
            </div>
          </details>
          <textarea
            class="w-full xl:w-2/3 rounded bg-gray-100 text-2xl"
            :style="{ height: `${item.answer.length * 30}px` }"
          />
        </div>

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
    }
  },

  methods: {
    setCurrentList() {
      if (this.currentArea.length === 0) {
        alert('Selecione pelo menos 1 item da lista de assuntos')
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
    },
    async updateQuestMemoryPoint(value, item) {
      try {
        await this.$axios.patch(`http://localhost:3010/remember/${item._id}`, {
          memory: value + item.memory
        })

        alert(`Atualizando ${value} para ${item._id}`)
      } catch (error) {
        alert(`Não foi possível atualizar  ${item._id}`)
      }
    },
    async deleteQuestItem(item) {
      try {
        await this.$axios.delete(`http://localhost:3010/remember/${item._id}`)
        alert(`Deletado  para ${item._id}`)
      } catch (error) {
        alert(`Não foi possível deletar  ${item._id}`)
      }
    }
  }
}
</script>
