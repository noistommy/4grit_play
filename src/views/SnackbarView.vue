<script setup>
import { inject } from 'vue'
import { useI18n } from 'vue-i18n'
const snackbars = inject('$snackbars')
const toast = inject('$toast')

const showSnackbar = (state) => {
    snackbars.show(state, state, { toast: true, freeze: false })
}

const showToast = (state) => {
    toast.show(state, state, {})
}

const showAnywhere = () => {
    const pos = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    }
    console.log(pos)
    snackbars.show('success', ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, quis aut?', { freeze: true }, pos)
}

const { locale } = useI18n()

const selectLocale = (localeText) => {
    locale.value = localeText
}

</script>

<template>
    <h1 >Snackbar</h1>
    <p v-html="$t('common.feedDaButton')"></p>
    <p>{{$t('common.emailTest')}}</p>
    <div class="ga-buttons">
        <div class="ga-button success" @click="showSnackbar('success')">success</div>
        <div class="ga-button attention" @click="showSnackbar('attention')">attention</div>
        <div class="ga-button info" @click="showSnackbar('info')">info</div>
        <div class="ga-button importance" @click="showSnackbar('importance')">importance</div>
        <div class="ga-button danger" @click="showSnackbar('danger')">danger</div>
        <div class="ga-button" @click="showAnywhere">Anywhere</div> 
    </div>
    <br>
    <div class="ga-buttons">
        <div class="ga-button success" @click="showToast('success')">success</div>
        <div class="ga-button attention" @click="showToast('attention')">attention</div>
        <div class="ga-button info" @click="showToast('info')">info</div>
        <div class="ga-button importance" @click="showToast('importance')">importance</div>
        <div class="ga-button danger" @click="showToast('danger')">danger</div>
        <div class="ga-button" @click="showAnywhere">Anywhere</div> 
    </div>
    <h1>i18n 테스트</h1>
    <div class="ga-buttons">
        <button class="ga-button" @click="selectLocale('ko')">KO</button>
        <button class="ga-button" @click="selectLocale('en')">EN</button>
        <button class="ga-button" @click="selectLocale('ja')">JA</button>
    </div>
</template>