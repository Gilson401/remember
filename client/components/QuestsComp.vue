<template>
  <div class="p-4">
    <label for="area">Assunto:</label>

    <div class="flex space-x-2">
      <select
        id="area"
        v-model="currentArea"
        class="form-select appearance-none block w-32 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        name="area"
      >
        <option v-for="area in areas" :key="area" :value="area">
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
    <div
      v-for="(item, index) in currentList"
      :key="index"
      class="p-2 my-4 rounded bg-blue-200 w-full shadow-sm"
    >
      <p class="ml-11 mb-2 font-bold">
        Index: {{ index }}, Tags: {{ item.assunto.join(' - ') }}, Memory Points:
        {{ item.memory }}
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
        <button
          class="ml-11 mb-2 bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
        >
          Acertou
        </button>
        <button
          class="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
        >
          Errou
        </button>
      </details>
      <textarea
        class="w-full xl:w-1/2 rounded bg-gray-100 text-2xl"
        :style="{ height: `${item.answer.length * 30}px` }"
      />
    </div>
  </div>
</template>

<script>
import quests from '../helpers/quests/quests'
import questsgithub from '../helpers/quests/quests-github'

export default {
  data() {
    return {
      currentArea: 'geral',
      currentList: [],
      listas: {
        geral: quests,
        github: questsgithub
      }
    }
  },
  computed: {
    areas() {
      return Object.keys(this.listas)
    },
    questions() {
      return (param) => this.listas[param]
    }
  },
  methods: {
    setCurrentList() {
      this.currentList = this.listas[this.currentArea]
    }
  }
}
</script>

<style lang="postcss" scoped></style>
