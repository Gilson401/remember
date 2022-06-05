<!-- @format -->

<template>
  <li
    class="border-transparent border-none w-full break-words"
    :class="{ highlighted: isClicked }"
    @click="toggleIsClicked"
  >
    <slot />
  </li>
</template>

<script>
export default {
  data() {
    return {
      isClicked: false,
    }
  },
  methods: {
    toggleIsClicked() {
      this.isClicked = !this.isClicked
    },
  },
}
</script>

<style lang="postcss" scopped>
.highlighted {
  @apply text-indigo-700 underline font-bold;
}
</style>
