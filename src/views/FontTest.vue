<script setup>
import { useI18n } from 'vue-i18n'
import { ref, reactive, computed, onMounted } from 'vue'
// import Fonts from '@/data/font-list.json'
import GoogleFonts from '@/data/google-fonts.json'

const MIN_SIZE = 12
const MAX_SIZE = 110
let titleBaseline = 0
const block = ref(null)
const base = ref(null)
const search = ref('Noto Sans KR')
const searchList = ref([])
const fontInfo = reactive({
  name: 'Noto Sans KR',
  size: 15
})

const searchedList = reactive([])

const baselineOffset = computed(() =>{
  if(!block.value) return
  return getBaselineOffset(fontInfo.size)
})

const applyFont = () => {
  fontInfo.name = search.value
  titleBaseline = getBaselineOffset(60)
}
const getBaselineOffset = (size) => {
  block.value.style.fontSize = size + 'px'
  return size - (base.value.offsetTop - block.value.offsetTop)
}
const setFont = (font = null) => {
  search.value = typeof font === 'object' ? font.family : search.value.value
  if (font) titleBaseline = font.baseline
  console.log(titleBaseline)
  
}
const saveFont = () => {
  if(searchedList.every(item => item.name !== fontInfo.name)) {
    const searched = {
      family: fontInfo.name,
      baseline: titleBaseline
    }
    searchedList.push(searched)
  }
}
const searchFont = ({ target }) => {
  if(target.value === '') searchList.value = []
  searchList.value = GoogleFonts.items.filter(item => item.family.indexOf(target.value) > -1)
  // searchList.value = Fonts.filter(item => item.family.indexOf(target.value) > -1)
}
const { locale } = useI18n() || 'ko'
const changeLocale = () => {
  locale.value = locale.value === 'ko' ? 'en' : 'ko'
}

onMounted(() => {
  if(block.value) {
    titleBaseline = getBaselineOffset(60)

  }
  
})



</script>

<template>
  <div class="title">{{ $t('pageA.title') }}</div>
  <div class="title">{{ $t('pageA.subTitle') }}</div>
  <div class="title" v-html="$t('pageA.main')"></div>
  <button class="ga-button" @click="changeLocale()">{{ locale }} {{ $i18n.locale }}</button>
  <button class="ga-button" @click="locale = locale === 'ko' ? 'en' : 'ko'">{{ locale }}</button>
  <div class="block" ref="block" :style="{ fontFamily: search }">Lqfglx{{ search }}<span ref="base"></span></div>
  <div class="font-control-wrapper">
    <div class="field">
      <label for="fontname">Font Name:</label>
      <input type="text" name="fontname" v-model="search" @input="searchFont"/>
      <span @click="applyFont">적용</span>
    </div>
    <div class="field">
      <label for="fontsize">Size:</label>
      <input type="number" name="fontsize" :min="MIN_SIZE" :max="MAX_SIZE" v-model="fontInfo.size"/>
      <span>px</span>
    </div>
  </div>
  <div class="font-size-nav">
    <div class="size-item" v-for="size in 60" :key="size" :class="{selected: fontInfo.size === size + 11}" @click="fontInfo.size = size + 11">
      {{ size + 11 }}
    </div>
  </div>
  <div class="font-display-wrapper">
    <div class="display-main">
      <div class="font-info">
        <div class="area"  :style="{ fontFamily: fontInfo.name, '--bl': titleBaseline+ 'px'}" @click="saveFont">
          {{ fontInfo.name }}
          <span></span>
        </div>
        <div class="baseline-ratio"> Baseline Ratio: {{ baselineOffset }}px / {{ fontInfo.size }}px</div>
        <div class="alphabet"  :style="{ fontFamily: fontInfo.name}" >
          <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          <p>abcdefghijklmnopqrstuvwxyz</p>
          <p>1234567890</p>
        </div>
      </div>
      <div class="font-tester">
        <div class="edit-view" contenteditable="true">{{ fontInfo.name }}</div>
      </div>
    </div>
    <div class="display-sub">
      <div class="about"
        :style="{ fontFamily: fontInfo.name, fontSize: fontInfo.size + 'px' }"
      > 
        <div v-for="num in 9" :class="`weight-${num}00`" :key="num">{{ fontInfo.name }} weight: {{ num }}00</div>
      </div>
    </div>
  </div>
  <div class="searched-list">
    <div class="item" v-for="item in searchList" :key="item.family" @click="setFont(item)">{{ item.family }}</div>
  </div>
  <div class="font-search-list-wrapper">
    <div v-for="(font, i) in searchedList" :key="i" class="searched-item">
      <div class="font-title" @click="setFont(font)">
        <div class="area"  :style="{ fontFamily: font.family}">
          {{ font.family }}
          <span :style="{ '--bl': font.baseline+ 'px' }"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bettery-test {
  font-size: 3em;
}
.font-control-wrapper {
  padding: 10px;
  display: flex;
  gap: 20px;
  border: 1px solid var(--color-border);
  .field {
    label {
      margin-right: 5px;
    }
    input {
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid var(--color-border);
      outline: 0;
      background-color: var(--color-border);
      color: var(--color-text);
      &[name='fontsize'] {
        width: 40px;
        text-align: right;
      }
    }
    span {
      margin-left: 5px;
    }
  }
}
.font-size-nav {
  display: flex;
  flex-wrap: wrap;
  height: 15px;
  max-width: 900px;
  .size-item {
    text-align: center;
    font-size: 12px;
    flex-grow: 1;
    transition: background 500ms linear;
    color: var(--color-background);
    &:hover {
      background-color: var(--color-text);
    }
    &.selected {
      background-color: #fff;
    }
  }
}
.font-display-wrapper {
  display: flex;
  margin-top: -1px;
  border: 1px solid var(--color-border);
  &> div {
    padding: 10px;
    flex-grow: 1;
    &:first-child {
      border-right: 1px solid var(--color-border);
    }
  }
  .display-main {
    max-width: 600px;
  }
}
.font-search-list-wrapper {
  .searched-item {
    padding: 10px 20px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    margin-top: 5px;
    .font-title .area{
      font-weight: 100;
    }
  }
}
.searched-list {
  width: 100%;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  .item {
    font-size: 12px;
    padding: 2px 4px;
    background-color: var(--color-background-soft);
    border-radius: 15px;
  }
}
.block {
  visibility: hidden;
  line-height: 1;
  position: fixed;
  top: 0;
  span {
    font-size: 0;
    vertical-align: baseline;
    padding: 0 10px;
  }
}
.alphabet {
  line-height: 1;
  font-size: 24px;
  letter-spacing: 1px;
}
.area {
  --bl: 0;
  font-size: 60px;
  display: inline-block;
  line-height: 1;
  background-color: var(--color-border);
  margin: 0;
  padding: 0;
  position: relative;
  span {
    
    position: absolute;
    width: 100%;
    background-color: red;
    left: 0;
    bottom: 0;
    height: var(--bl);
    opacity: .16;
  }
}
.about {
  .weight-100 { font-weight: 100; }
  .weight-200 { font-weight: 200; }
  .weight-300, .light { font-weight: 300; }
  .weight-400 { font-weight: 400; }
  .weight-500 { font-weight: 500; }
  .weight-600 { font-weight: 600; }
  .weight-700, .bold { font-weight: 700; }
  .weight-800 { font-weight: 800; }
  .weight-900 { font-weight: 900; }
}
.edit-view {
  padding: 10px;
  border: 1px solid var(--color-border);
  outline: 0;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

</style>
