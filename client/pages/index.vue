<template>
  <main class="pr-2 w-full h-full flex flex-col">
    <QuestsComp v-if="$store.state.display.mode === 'quest'" />

    <FormCreate v-if="$store.state.display.mode === 'form'" />
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
