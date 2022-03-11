<template>
  <main>
    <h1 class="w-full mx-auto text-center my-5 text-2xl">Questionário</h1>
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
