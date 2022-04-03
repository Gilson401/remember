<template>
  <div>
    <div class="my-2 w-full h-40 bg-green-200 flex items-stretch">
      <div class="mx-3 w-2 bg-red-300"></div>
    </div>

    <div class="my-2 w-full h-40 bg-green-200 flex">
      <div class="mx-3 h-2 flex-grow bg-red-300"></div>
    </div>

    <div class="p-4 my-2 w-full h-40 bg-green-200 flex flex-col">
      <div class="mx-3 w-2 flex-grow bg-red-300"></div>
      pai : flex flex-col filhos: flex-grow
    </div>

    <div class="my-2 w-full h-40 bg-green-200 flex flex-col items-stretch">
      <div class="mx-3 h-2 bg-red-300"></div>
    </div>

    <div class="largurapai bg-red-300">
      <div class="overelips largura gride">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, libero
        laboriosam saepe hic nesciunt voluptas autem unde tempore eaque quas
        quos reprehenderit impedit accusamus architecto suscipit optio quis
        atque amet.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mouseY: 0,
      mouseX: 0,
      isActive: false,
      value: 0,
      text: ''
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.altura {
  height: 3vh;
}
.largura {
  width: 200px;
}

.largurapai {
}

.overelips {
  text-overflow: ellipsis;
  width: 200px;
  outline: 1px solid #000;
  white-space: nowrap;
  overflow: hidden;
}
</style>
