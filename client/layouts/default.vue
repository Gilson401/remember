<template>
  <div class="flex items-start h-screen pl-64">
    <aside class="">
      <!-- Sidebar -->
      <nav
        id="sidebarMenu"
        class="h-screen fixed top-0 bottom-0 collapse d-lg-block sidebar collapse bg-white"
      >
        <div class="">
          <div class="list-group list-group-flush mx-3 mt-4 text-2xl font-bold">
            <ul>
              <li @click="changeMode('form')">
                <span class="mr-2">&#128221; </span>Form
              </li>
              <li @click="changeMode('quest')">
                <span class="mr-2"> &#10067; </span>Quest
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- Sidebar -->
    </aside>

    <Nuxt />
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
  mounted() {},
  methods: {
    changeMode(mode) {
      this.$store.commit('display/SET_MODE', mode)
    }
  }
}
</script>

<style lang="postcss">
html,
body,
#__nuxt,
#__layout {
  @apply h-full;
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
  z-index: 600;
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
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}
</style>
