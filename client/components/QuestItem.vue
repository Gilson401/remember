<!-- @format -->

<template>
  <div class="p-2 my-4 rounded w-full shadow-sm" :class="answerState">
    <p v-if="$store.state.display.showMetaData" class="ml-11 mb-2 font-bold">
      Index: {{ index }}, Tags:
      <span
        v-for="(tag, tagIndex) in item.assunto"
        :key="tagIndex"
        class="mr-2 text-base inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-gray-200 text-gray-700 rounded"
      >
        {{ tag }}</span
      >
      , Memory Points: {{ item.memory }} , id: {{ item._id }}
      <span v-if="item.lastDayVisited">
        &#128467;&#65039; {{ item.lastDayVisited }}</span
      >
    </p>

    <div class="w-full">
      <p class="ml-2 mb-2 text-2xl w-full">
        <span
          class="ml-11 mb-2 text-2xl cursor-pointer"
          @click="showResp = !showResp"
        >
          &#128064;
        </span>

        {{ item.question.replace('#x', item.answer.length) }}
      </p>

      <div v-show="showResp">
        <ul class="ml-11 mb-2 text-2xl">
          <QuestItemListItem
            v-for="(ritem, rindex) in item.answer"
            ref="answerRef"
            :key="rindex"
          >
            {{ rindex + 1 }} - {{ ritem }}
          </QuestItemListItem>
        </ul>

        <div v-if="item.link && item.link.length > 0">
          <ul v-if="$store.state.display.showMetaData" class="my-2">
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
          :src="require(`~/assets/${item.image}`)"
          :title="item.image"
          :alt="item.image"
          @click="startModal(item)"
        />

        <div v-else-if="item.images" class="flex ml-11 w-full overflow-x-auto">
          <img
            v-for="(preview, i) in item.images"
            :key="i"
            :src="require(`~/assets/${preview}`)"
            :title="preview"
            :alt="preview"
            @click="startModal(item)"
          />
        </div>

        <div
          v-if="$store.state.display.showMetaData"
          class="flex w-full content-center h-10"
        >
          <button
            class="btn-memory"
            :class="{
              'cursor-not-allowed': answerState !== 'undefined',
              'cursor-pointer': answerState === 'undefined',
            }"
            type="button"
            :disabled="answerState !== 'undefined'"
            @click="updateQuestMemoryPoint(1, item)"
          >
            Acertou
          </button>
          <button
            class="btn-memory"
            :class="{
              'cursor-not-allowed': answerState !== 'undefined',
              'cursor-pointer': answerState === 'undefined',
            }"
            type="button"
            :disabled="answerState !== 'undefined'"
            @click="updateQuestMemoryPoint(-1, item)"
          >
            Errou
          </button>
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-12 gap-2 place-content-center w-full"
      :style="{ 'min-height': `${item.answer.length * 35 + 2}px` }"
    >
      <textarea
        v-model="answerCount"
        class="w-full rounded bg-gray-100 text-2xl col-span-10"
        :style="{ height: `${item.answer.length * 35}px` }"
      />

      <div
        class="w-max h-max p-4 inline-block leading-10 text-center text-3xl my-auto text-blue-800 mx-2 bg-red-300 col-span-2 rounded-full"
      >
        {{ countLinesAnswer }}/{{ item.answer.length }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
    currentDay: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      answerState: 'undefined',
      answerCount: '',
      showResp: false,
    }
  },
  computed: {
    countLinesAnswer() {
      return this.answerCount.split(/\r?\n/).filter((item) => item.length > 0)
        .length
    },
  },

  methods: {
    startModal(item) {
      this.showModal = true
      this.$store.commit('display/SET_SHOW_MODAL_IMAGE', item.image)

      if (item.images) {
        this.$store.commit('display/SET_SHOW_MODAL_IMAGES', item.images)
      }

      this.$store.commit('display/SET_SHOW_MODAL', true)
    },
    async updateQuestMemoryPoint(value, item) {
      try {
        const payload = {
          _id: item._id,
          memory: value + item.memory,
          lastDayVisited: this.currentDay,
        }
        await this.$store.dispatch('display/updateQuestMemoryPoint', payload)

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
        await this.$store.dispatch('display/deleteQuestItem', item._id)
        alert(`Deletado  para ${item._id}`)
      } catch (error) {
        alert(`Não foi possível deletar  ${item._id}`)
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.undefined {
  @apply bg-blue-200;
}
.right {
  @apply bg-green-200 transition ease-in-out duration-300;
}

.wrong {
  @apply bg-red-200 transition ease-in-out duration-300;
}
input,
textarea {
  @apply px-2;
}
.btn-memory {
  @apply ml-11 mb-2 bg-gray-500 text-white bg-gray-200 font-bold uppercase text-xs px-4 py-2 rounded shadow 
  hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150;
}

img {
  aspect-ratio: 2;
  width: 150px;
  @apply ml-11 mb-2 cursor-pointer;
}
</style>
