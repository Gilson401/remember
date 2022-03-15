<template>
  <main class="w-full pr-2 h-screen flex flex-col bg-white relative">
    <QuestsComp
      v-if="$store.state.display.mode === 'quest'"
      class="pt-24 z-10"
    />

    <FormCreate
      v-if="$store.state.display.mode === 'form'"
      class="pt-24 z-10"
    />
  </main>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'default',

  data() {
    return {
      allMemoryItems: [],
      inUseSelection: []
    }
  }
}
</script>
