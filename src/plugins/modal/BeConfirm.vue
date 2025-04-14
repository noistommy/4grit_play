<template>
  <div class="be-modal" :style="{ '--offset': `${(id % 5) * 20}px` }">
    <div class="be-modal-background" />
    <div class="be-modal-container">
      <div class="modal confirm">
        <div class="modal-header">
          <div class="title">{{ props.title }}</div>
          <div class="close-btn" @click="$emit('close')">
            <i class="fa fa-xmark"></i>
          </div>
        </div>
        <div class="modal-contents">
          <div class="contents">
            <div>{{ props.description }}</div>
          </div>
        </div>
        <div class="modal-footer align-right">
          <button class="be-button primary" @click="allClose">확인</button>
          <button class="be-button secondary outline" @click="closeModal">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject} from 'vue'

const modal = inject('$beModal')
const emit = defineEmits(['close'])
const props = defineProps({
  id: Number,
  options: Object,
  props: Object
})

// const isLoading = ref(false)

const allClose = () => {
  props.result(props.params)
  modal.closeAll()
}
const closeModal = () => {
  emit('close')
  modal.close()
}

</script>

<style lang="scss"></style>