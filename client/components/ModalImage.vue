<!-- @format -->

<template>
  <!-- The Modal -->
  <div v-if="isOpen" id="myModal" class="modal">
    <!-- The Close Button -->
    <span class="close" @click="closeModal">&times;</span>
    <div v-if="$store.state.display.modalImages.length > 0">
      <button class="buttons-change left-0" @click="toggleLeft">
        &#128072;
      </button>
      <button class="buttons-change right-0" @click="toggleRight">
        &#128073;
      </button>
      <!-- Modal Content (The Image) -->

      <div
        v-for="(picture, index) in $store.state.display.modalImages"
        :key="index"
      >
        <img
          v-if="imageIndex === index"
          :src="require(`~/assets/${picture}`)"
          class="modal-content"
        />
      </div>
    </div>
    <img
      v-else-if="$store.state.display.modalImage"
      :src="require(`~/assets/${$store.state.display.modalImage}`)"
      class="modal-content"
    />

    <!-- Modal Caption (Image Text) -->
    <div id="caption"></div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
    },
  },
  data() {
    return {
      imageIndex: 0,
    }
  },

  computed: {
    getModalImage() {
      return `~/assets/${
        this.$store.state.display.modalImages[this.imageIndex]
      }`
    },
  },
  methods: {
    closeModal() {
      this.$store.commit('display/SET_SHOW_MODAL', false)
    },
    toggleLeft() {
      this.imageIndex--

      if (this.imageIndex < 0) {
        this.imageIndex = this.$store.state.display.modalImages.length - 1
      }
    },
    toggleRight() {
      this.imageIndex++
      if (this.imageIndex > this.$store.state.display.modalImages.length - 1) {
        this.imageIndex = 0
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.buttons-change {
  @apply mx-10 p-2 bg-white bg-opacity-50 w-20 h-20 rounded-full absolute top-1/2 text-2xl leading-5 text-center;
}
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 30; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  /* width: 100%;  */
  @apply w-screen;
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
}

/* Modal Content (Image) */
.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  /* max-width: 1000px; */
}

/* Caption of Modal Image (Image Text) - Same Width as the Image */
#caption {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  text-align: center;
  color: #ccc;
  padding: 10px 0;
  height: 150px;
}

/* Add Animation - Zoom in the Modal */
.modal-content,
#caption {
  animation-name: zoom;
  animation-duration: 0.6s;
}

@keyframes zoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

/* The Close Button */
.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px) {
  .modal-content {
    width: 100%;
  }
}
</style>
