<!-- @format -->

<template>
  <main class="pr-2 w-full h-full flex flex-col">
    <QuestsComp />
  </main>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'default',

  head() {
    return {
      title: 'Questionário',
    }
  },
}
</script>
