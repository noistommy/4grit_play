
<template>
  <teleport to="body">
    <template v-if="isModals">
      <template v-for="modal in modalRef" :key="modal.id">
        <template v-if="modal.comp === 'confirm'">
          <BeConfirm v-bind="modal" />
        </template>
        <template v-else>
          <BeModal title="Test" v-bind="modal" />
        </template>
      </template>
    </template>
  </teleport>
</template>

<script>
import BeModal from './BeModal.vue'
import BeConfirm from './BeConfirm.vue'
import { inject } from 'vue'


export default {
  name: 'BeTeleport',
  components: { BeModal, BeConfirm },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      isOpen: false,
      modalRef: [],
      modalIndex: 0
    }
  },
  computed: {
    isModals() {
      return this.modalRef.length > 0
    }
  },
  mounted() {
    const modal = inject('$beModal')
    const { emitter } = modal
    emitter.on('show-modal', modalRef => {
      modalRef.id = this.modalIndex
      modalRef.options = { ...this.options, ...modalRef.options }
      this.modalRef.push(modalRef)
      this.modalIndex++
    })
    emitter.on('close-modal', modalId => {
      console.log(modalId)
      this.modalRef.pop()
      this.modalIndex--
    })
    emitter.on('close-all-modal', () => {
      this.isOpen = false
      this.modalRef = []
      this.modalIndex = 0
    })
  },
  methods: {
    toggleMode() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="scss" scoped />


<!-- 
<script setup>
import BeModal from './BeModal.vue'
import BeConfirm from './BeConfirm.vue'

import { ref, computed, onMounted, inject } from 'vue'

const modal = inject('$beModal')

const props = defineProps({
  options: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const isOpen = ref(false)
const modalRef = ref([])
const modalIndex = ref(0)

const isModals = computed(() => {
  return modalRef.value.length > 0
})

const { emitter } = modal()
console.log("emitter", emitter)

emitter.on('show-modal', modal => {
  console.log("modal:",modal)
  modal.id = modalIndex.value
  modal.options = { ...props.options, ...modal.options }
  modalRef.value.push(modal)
  modalIndex.value++
})
emitter.on('close-modal', id => {
  console.log(id)
  modalRef.value.pop()
  modalIndex.value--
})
emitter.on('close-all-modal', () => {
  isOpen.value = false
  modalRef.value = []
  modalIndex.value = 0
})

// const toggleMode = () => {
//   isOpen.value = !isOpen.value
// }
</script>

<template>
  <teleport to="body">
    test {{ modalRef }}
    <template v-if="isModals">
      <template v-for="modal in modalRef" :key="modal.id">
        <template v-if="modal.comp === 'confirm'">
          <be-confirm v-bind="modal" />
        </template>
        <template v-else>
          <be-modal title="Test" v-bind="modal" />
        </template>
      </template>
    </template>
  </teleport>
</template>
 -->
