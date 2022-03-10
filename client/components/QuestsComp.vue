<template>
  <div class="p-4">
    <div
      v-for="(item, index) in questions"
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
      <textarea class="w-1/2 rounded bg-gray-100" />
    </div>
  </div>
</template>

<script>
import quests from '../helpers/quests'
export default {
  computed: {
    questions() {
      return quests
    }
  }
}
</script>

<style lang="postcss" scoped></style>
