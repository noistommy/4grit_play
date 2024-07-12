<script setup>
import TestSvg from './TestSVG.vue'
import SvgScript from './SvgScript.vue';
import ForumSvg from './ForumSvg.vue';
import SolomonUfo from './SolomonUfo.vue'
import { ref, reactive, onMounted } from 'vue';


let player = reactive({});
let state = ref('')

onMounted(() => {
    const element = document.getElementById('ewqfWDErNCm1');
    player = element ? element.svgatorPlayer : {};
    
    if(!player) return;
    
    // player.ready(player => player.play())
    // player.on('pause', offset => console.log(`current animation ${offset}`))
    // player.on('play', offset => console.log(`start play  ${offset}`))
    player.on('keyframe', loopTest)
    // element.addEventListener('click', () => svgTogglePlay())
    element.addEventListener('click', () => console.log(player.currentTime))
    // element.addEventListener('mouseover', () => console.log(player.currentTime))\
})

const svgTogglePlay = () => {
    player.toggle()
    console.log(player.state)
    state.value = player.state
}

const goToSeek = (value) => {
    player.seek(value)
}

const loopTest = current => {
    if(current >= 7000) {
        console.log(`again${current}`)
        player.seekTo(6500)
    }
}

</script>

<template>
    <div>
        <h3>Forum Icon</h3>
        <ForumSvg />
    </div>
    <div>
        <h3>SVG Component Script Test</h3>
        <SvgScript />
    </div>
    <div>
        <h3>SVG Images</h3>
        <img src="../../assets/Solomon_ufo_banner.svg" alt="">
        <img src="../..//assets/Solomon_button.svg" alt="">
        <img src="../../assets/test_svg.svg" alt="">
    </div>
    <div>
        <h3>SVGATOR Control Test</h3>
        <SolomonUfo />
        <button @click="svgTogglePlay">{{ state || 'playing' }}</button>
    </div>
    <div>
        <h3>Paticle test</h3>
        <img src="../../assets/particle_1.svg" alt="">
        
    </div>
    <div class="test-view">
        <h3>ViewBox test</h3>
        <TestSvg />
    </div>
</template>

<style lang="scss" scoped>
div {
    padding: 20px;
    border: 1px solid #454545;
    margin-bottom: 10px;
}
</style>