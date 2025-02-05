<script setup>
import { ref } from 'vue'
const boxType = ref('dropdown')
const isSearch = ref(false)
const options = [
  { id: 1, option: 'option 1'},
  { id: 2, option: 'option 2'},
  { id: 3, option: 'option 3'},
  { id: 4, option: 'option 4'},
  { id: 5, option: 'option 5'},
  { id: 6, option: 'option 6'},
]
const showSB1 = ref(false)
const selectedSB1 = ref(null)

const selectedSBs = ref([])

const type = 'single1'
const toggleSB = () => {
  if (!showSB1.value) {
    showSB1.value = true
  }
}

const selectOption = (option) => {
  if (type === 'single') {
    selectedSB1.value = option
    showSB1.value = false
  } else {
    selectedSBs.value.push(option)
  }
}

</script>

<template>
  <div class="container1">
    <div class="box-type-controller">
      <div class="ga-buttons">
        <div class="ga-button" :class="{selected: boxType === 'dropdown'}" @click="boxType = 'dropdown'">Dropdown</div>
        <div class="ga-button" :class="{selected: boxType === 'float'}" @click="boxType = 'float'">Float</div>
      </div>
    </div>
    <div class="search-on-off">
      <label class="ga-switch button">
        <input type="checkbox" v-model="isSearch" :checked="isSearch" />
        <span class="on" :class="{active: isSearch}">ON</span>
        <span class="off" :class="{active: !isSearch}">OFF</span>
      </label>
      <div class="ga-tag label">Search {{ isSearch ? 'on' : 'off' }}</div>
    </div>
    {{ selectedSBs }}
    <div class="slide-box-wrapper">
        <div class="ga-select-box" :class="[{open: showSB1}, boxType]" @click="toggleSB">
          <div class="selected-item ga-input icon right">
            <input type="text" placeholder="선택하세요." v-model="selectedSB1" :readonly="!isSearch" />
            <!-- <i class="icon fa fa-chevron-down"></i> -->
            <i class="icon xi-angle-down"></i>
          </div>
          <div class="select-menu">
            <div class="ga-list selection">
              <div class="item option-item" v-for="(item, i) in options" :key="item.id" @click="selectOption(item.option)">{{ item.option }}</div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:root {
  color-scheme: light;
}
.container1 {
  padding: 20px;
  & > div {
    margin-bottom: 20px;
  }
}
.option-item {
  padding: 10px;
}
</style>