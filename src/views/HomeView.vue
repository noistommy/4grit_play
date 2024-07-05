<script setup>
// import TheWelcome from '../components/TheWelcome.vue';
import { getCurrentInstance } from 'vue'
import TextArea from '../components/TestArea/TextArea.vue';

const { proxy } = getCurrentInstance()

const findAnyWhere = ({ pageX, pageY}) => {
  proxy.$snackbars.show('success', 'tesat snackbars', {}, {x:pageX, y: pageY})
}
</script>

<template>
  <main @click="findAnyWhere">
    <!-- <TheWelcome /> -->
    <TextArea />
  </main>
</template>
