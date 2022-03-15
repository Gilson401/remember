<template>
  <div class="p-2 my-4 rounded w-full shadow-sm" :class="answerState">
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
              v-if="link"
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
        @click="startModal(item.image)"
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
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      answerState: 'undefined'
    }
  },
  methods: {
    startModal(image) {
      this.showModal = true
      this.modalImage = image
      this.$store.commit('display/SET_SHOW_MODAL_IMAGE', image)
      this.$store.commit('display/SET_SHOW_MODAL', true)
    },
    async updateQuestMemoryPoint(value, item) {
      try {
        await this.$axios.patch(`http://localhost:3010/remember/${item._id}`, {
          memory: value + item.memory
        })

        if (value > 0) {
          this.answerState = 'right'
        } else {
          this.answerState = 'wrong'
        }
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

<style lang="postcss" scoped>
.undefined {
  @apply bg-blue-200;
}
.right {
  @apply bg-green-200 transition ease-in-out duration-700;
}

.wrong {
  @apply bg-red-200 transition ease-in-out duration-700;
}
</style>
