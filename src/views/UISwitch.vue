<script setup>
import { ref, reactive, defineEmits } from 'vue'

const emit = defineEmits(['select'])
const toggle = ref(true)

const pdata = reactive({
    baseClass: 'icon-roulette',
    onClass: 'icon-card-list'
})

const selectedToggle = () => {
    toggle.value = !toggle.value
    emit('select', toggle.value)
}

</script>

<template>
    <div class="container">

        <div class="btf-switch" @click="selectedToggle">
            <div class="b-base">
                <i class="icon size-20" :class="[pdata.baseClass]"></i>
                <i class="icon size-20" :class="[pdata.onClass]"></i>
            </div>
            <div class="b-button" :class="{on: toggle}">
                <div class="button-wrap">
                    <i class="icon size-20" :class="[`${pdata.baseClass}-active`]"></i>
                    <i class="icon size-20" :class="[`${pdata.onClass}-active`]"></i>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="switch-wrapper">
    </div> -->
    <!-- <div class="button-wrapper">

        <button class="btf-button outline round shadow" :class="{show: toggle}" @click="selectedToggle">
            test text
            <i class="icon icon-roulette size-14"></i>
        </button>
    </div> -->
</template>

<style lang="scss" scoped>
.button-wrapper, .switch-wrapper {
    display: flex;
    justify-content: center;
    padding: 30px;
    background-color: #f2f2f2;
}
.btf-button {

    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 7px 10px;
    line-height: 1;
    font-weight: 500;
    font-family: Roboto;
    border: 0;
    &.outline {
        color: #444;
        background-color: #fff;
        outline:1px solid rgba(0, 0, 0, 0.08)
    }
    &.round {
        border-radius: 1em;
    }
    &.shadow {
        box-shadow: 0px 5px 6px -3px rgba(0, 0, 0, 0.12);
    }
    &.show {
        background-color: #444;
        color: #fff;
        i.icon {
            transition: tranform 250ms;
            background-color: #fff;
            transform: scale(1.1);
        }
    }
}
.btf-switch {
    cursor: pointer;
    width: 90px;
    height: 32px;
    border-radius: 16px;
    outline: 1px solid #D7D7D7;
    position: relative;
    overflow: hidden;
    &:before {
        //content: '';
        position: absolute;
        background-image: url('../assets/icon-roulette.svg');
        width: 20px;
        height: 20px;
        top: 6px;
        left: 15px;
    }
    &:after {
        //content: '';
        position: absolute;
        background-image: url('../assets/icon-card-list.svg');
        width: 20px;
        height: 20px;
        top: 6px;
        right: 15px;
    }
    .b-base {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.1);
        box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.04) inset 0 0 1px;
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 15px;
        
    }
    .button-wrap {
        width: 90px;
        padding: 6px 15px;
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        transition: transform 200ms;
        //opacity: 0.4;
    }
    .b-button {
        position: absolute;
        z-index: 10;
        width: 50px;
        height: 32px;
        top: 0;
        left: 0;
        border-radius: 16px;
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.20);
        overflow: hidden;
        transition: all 200ms;
        &.on {
            transform: translateX(40px);
            .button-wrap {
                transform: translateX(-40px);
            }
        }
    }
}
.icon {
    display: inline-block;
    background-position: 0 0;
    background-repeat: no-repeat;
    &.size-14 {
        width: 14px;
        height: 14px;
        background-size: cover;
    }
    &.size-20 {
        width: 20px;
        height: 20px;
    }
}
.icon-card-list {
    background-image: url('../assets/icon-card-list.svg');
}
.icon-roulette{
    background-image: url('../assets/icon-roulette.svg');
}
.b-button {
    .icon-card-list-active {
        background-image: url('../assets/icon-card-list-active.svg');
    }
    .icon-roulette-active{
        background-image: url('../assets/icon-roulette-active.svg');
    }
}

</style>