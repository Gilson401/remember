import Vue from 'vue'

Vue.directive('scroll', {
  inserted(el, binding) {
    const f = function (evt) {
      if (binding.value(evt, el)) {
        el.removeEventListener('scroll', f)
      }
    }
    el.addEventListener('scroll', f)
  }
})
