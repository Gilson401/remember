<template>
  <div class="default_container">
    <aside
      class="h-screen px-4 flex flex-col flex-grow-0 border border-gray-200"
    >
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
          <li class="options">
            <NuxtLink to="/list"
              ><span class="mr-2"> &#128203; Gestão </span>  </NuxtLink
            >
          </li>
        </ul>
      </div>

      <p class="text-2xl py-2">Lista de tags</p>
      <select v-model="$store.state.display.sorting" class="options text-2xl">
        <option value="" disabled>Ordene</option>
        <option value="alfabetical">Ordenar por Alfabético</option>
        <option value="memoryPoints">Ordenar por Ponto de Memória</option>
      </select>

      <div class="h-full flex flex-col overflow-hidden overflow-y-auto my-4">
        <ul>
          <li
            v-for="(item, index) in tagsSortedByMemoryPoint"
            :key="index"
            class="block justify-between flex text-2xl"
          >
            <div>
              {{ item[0] }}
            </div>
            <div>
              {{ item[1] }}
            </div>
          </li>
        </ul>
      </div>
      <div class="mb-4 text-2xl pt-4">
        <span>&#9881;</span>
        <select
          v-model="$store.state.display.showMetaData"
          class="options text-2xl"
        >
          <option value="" selected disabled hidden>Meta</option>
          <option :value="true">Exibir Metadata</option>
          <option :value="false">Ocultar Metadata</option>
        </select>
      </div>
    </aside>
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      mode: 'quest'
    }
  },
  computed: {
    tagsSortedByMemoryPoint() {
      const data = {
        memoryPoints: this.$store.getters['display/tagsSortedByMemoryPoint'],
        alfabetical:
          this.$store.getters['display/tagsAndMemoryPointAlphabetical']
      }
      return data[this.$store.state.display.sorting]
    }
  },
  mounted() {},
  methods: {
    changeMode(mode) {
      this.$store.commit('display/SET_MODE', mode)
    }
  }
}
</script>

<style lang="postcss" scoped>
.options {
  @apply hover:bg-gray-300 transition ease-in duration-300 py-2;
}

html,
body,
#__nuxt,
#__layout {
  @apply h-full;
}

.default_container {
  display: grid;
  grid-template-areas:
    'aside content     content     content     content     content'
    'aside content content content content content'
    'aside content content content content content';
}

aside {
  grid-area: aside;
}

.top {
  grid-area: top;
}

.content {
  grid-area: content;
}
</style>
