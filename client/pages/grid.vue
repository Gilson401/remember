<template>
  <div>
      <div v-if="false">

      
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

<div class="my-2 border border-red-700 grid-container">
    <div class="grid-items">DIV 1</div>
    <div class="grid-items">DIV 2</div>
    <div class="grid-items">DIV 3</div>
    <div class="grid-items">DIV 4</div>
    <div class="grid-items">DIV 5</div>
</div>

<div class="my-2 border border-red-700 grid-container-1">
    <div class="grid-items">DIV 1</div>
    <div class="grid-items">DIV 2</div>
    <div class="grid-items">DIV 3</div>
    <div class="grid-items">DIV 4</div>
</div>

  </div>
</template>

<script>
export default {
  layout: 'nolayout',
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

.grid-container-1 {
    display: grid;
    gap: 1rem;
    /* 4 colunas iguais não importa a largura do dispositivo */
    grid-template-columns: repeat(4,  1fr);
}

.grid-container {
    display: grid;
    gap: 1rem;
    /* qtd de colunas indefinida. Coluna com no mínimo 250px  
    se necessário os filhos são jogados para baixo */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}


.grid-items{
    @apply bg-green-300 h-20;
}
</style>
