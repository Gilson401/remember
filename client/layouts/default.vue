<template>
  <div class="default_container">
    <aside
      class="h-screen px-4 flex flex-col flex-grow-0 border border-gray-200"
    >
      <div class="mb-4 text-2xl pt-4 border-b border-gray-200 cursor-pointer">
        <ul>
          <li
            class="hover:bg-gray-300 transition ease-in duration-300 py-2"
            @click="changeMode('form')"
          >
            <span class="mr-2">&#128221; </span>Form
          </li>
          <li
            class="hover:bg-gray-300 transition ease-in duration-300 py-2"
            @click="changeMode('quest')"
          >
            <span class="mr-2"> &#10067; </span>Quest
          </li>
        </ul>
      </div>
      <p class="text-2xl py-2">Lista de tags</p>
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
      <div class="mb-4 text-2xl pt-4">Bottom element on aside</div>
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
      return this.$store.getters['display/tagsSortedByMemoryPoint']
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

/* Sidebar */
.sidebar {
  /* position: relative; */
  top: 0;
  bottom: 0;
  left: 0;
  padding: 58px 20px 0; /* Height of navbar */
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
  width: 240px;
}

@media (max-width: 991.98px) {
  .sidebar {
    width: 100%;
  }
}
.sidebar .active {
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
}

.sidebar-sticky {
  @apply relative pt-2 overflow-hidden;

  top: 0;
  height: calc(100vh - 48px);

  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}
</style>
