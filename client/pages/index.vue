<template>
  <main>
    <h1 class="text-6xl leading-tight mb-4 pb-4 border-b">Questionário</h1>
    <QuestsComp />
  </main>
</template>

<script>
export default {
  name: 'IndexPage',

  //   TODO
  data() {
    return {
      allMemoryItems: [],
      inUseSelection: []
    }
  }
}
</script>
