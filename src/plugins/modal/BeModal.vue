
<template>
  <transition name="fade">
    <div v-if="isVisible" class="be-modal" :style="{ '--offset': `${(id % 5) * 20}px` }">
      <div class="be-modal-background" @click="closeModalToClick" />
      <div class="be-modal-container" >
        <component :is="compContents" :modal-id="id" v-bind="props" @close="closeModal" />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, inject } from 'vue'

const modal = inject('$beModal')
const props = defineProps({
  id: Number,
  comp: {
    type: Object,
    default: () => {
      return {}
    }
  },
  options: Object,
  props: Object
})

const emit = defineEmits(['close'])
const isVisible = ref(false)
const compContents = ref(null)

onMounted(() => {
  compContents.value = props.comp
  nextTick(() => (isVisible.value = compContents.value))
  if (props.options.escapeToClose) {
    window.addEventListener('keydown', (e) =>{ onEscapeKeyPress(e) })
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', (e) => { onEscapeKeyPress(e) })
})
const closeModal = () => {
  emit('close')
  modal.close(props.id)
}

const onEscapeKeyPress = (event) => {
  console.log(event)
  const keyCode = event.keyCode || event.which
  if (keyCode === 27) {
    closeModal()
  }
}
const closeModalToClick = (event) => {
  if (props.options.clickToClose && event.target.className.indexOf('background') > -1) {
    modal.close(props.id)
  }
}

</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 500ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
