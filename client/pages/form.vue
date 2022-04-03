<template>
  <main class="pr-2 w-full h-full flex flex-col">
    <FormCreate />
  </main>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'default',

  //   data() {
  //     return {
  //       allMemoryItems: [],
  //       inUseSelection: []
  //     }
  //   },
  head() {
    return {
      title: 'Form'
    }
  }
}
</script>
