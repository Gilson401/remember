<template>
  <main class="mx-4">

            <div class="mb-4 text-2xl pt-4 border-b border-gray-200 cursor-pointer">
        <ul>
          <li class="options">
            <NuxtLink to="/form"
              ><span class="mr-2">&#128221; </span>Formulário</NuxtLink
            >
          </li>
          <li class="options">
            <NuxtLink to="/"
              ><span class="mr-2"> &#10067; </span>Questionário</NuxtLink
            >
          </li>
        </ul>
      </div>

    <h1 class="text-6xl">Gestão de questões</h1>

    <div class="my-4 items-stretch flex">
      <button
        :disabled="!paginationData.prevPage"
        :class="{
          'cursor-not-allowed bg-opacity-20': !paginationData.prevPage
        }"
        @click="goPrevious"
        class="bg-gray-600"
      >
        Back
      </button>

      <span class="mx-4"> {{ paginationData.page }} </span>

      <button
        @click="goNext"
        class="bg-gray-600"
        :disabled="!paginationData.nextPage"
        :class="{
          'cursor-not-allowed bg-opacity-20': !paginationData.nextPage
        }"
      >
        Next
      </button>

      <select
        class="outline-none ml-4 rounded-sm mb-1 px-4 py-1 border border-gray-500"
        @change="setPageSize($event.target.value)"
      >
        <option value="" selected disabled hidden>Qtd por pagina</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>

    <table class="table-auto w-full">
      <thead>
        <tr>
          <th>Id</th>
          <th>Enunciado</th>
          <th>Respostas</th>
          <th>Última Vista</th>
          <th>Ação</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, key) in items" :key="key">
          <td>{{ item._id }}</td>
          <td>{{ item.question }}</td>
          <td>
            <ul>
              <li v-for="(itema, keya) in item.answer" :key="keya">
                {{ itema }}
              </li>
            </ul>
          </td>
          <td>{{ item.lastDayVisited }}</td>
          <td>
            <div class="flex">
              <button
                class="bg-green-500 inline-block mr-2"
                type="button"
                @click="deleteQuestItem(item)"
              >
                Edit
              </button>

              <button
                class="bg-red-500 inline-block"
                type="button"
                @click="deleteQuestItem(item)"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
export default {
  layout: 'nolayout',
  async asyncData({ route, store }) {
    store.dispatch('display/reset')
    store.commit('display/SET_PARAMS', {
      page: 1,
      limit: 10
    })
    await store.dispatch('display/indexPaginate')
  },
  data() {
    return {
      params: {}
    }
  },
  head() {
    return {
      title: 'Admin'
    }
  },
  computed: {
    items() {
      return this.$store.getters['display/getItems']
    },
    paginationData() {
      return this.$store.getters['display/getPaginationData']
    }
  },
  mounted() {},
  methods: {
    async setPageSize(e) {
      this.$store.commit('display/SET_PAGE_LIMIT', parseInt(e))
      await this.$store.dispatch('display/indexPaginate')
    },
    async goNext() {
      if (this.paginationData.nextPage) {
        this.$store.commit('display/SET_PARAMS', {
          page: this.paginationData.page + 1,
          limit: this.paginationData.limit
        })
      }
      await this.$store.dispatch('display/indexPaginate')
    },
    async goPrevious() {
      if (this.paginationData.prevPage) {
        this.$store.commit('display/SET_PARAMS', {
          page: this.paginationData.page - 1,
          limit: this.paginationData.limit
        })
      }
      await this.$store.dispatch('display/indexPaginate')
    },
    async deleteQuestItem(item) {
      try {
        await this.$store.dispatch('display/deleteQuestItem', item._id)
        alert(`Deletado  para ${item._id}`)
      } catch (error) {
        alert(`Não foi possível deletar  ${item._id}`)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
button {
  @apply text-white font-bold uppercase text-xs  rounded shadow  
    outline-none  mb-1 px-4 py-2 ease-linear transition-all duration-150;
}

td,
th {
  @apply border border-black;
}
</style>
