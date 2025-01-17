<script setup>

const cardData = [
    {
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        desc: 'Pariatur molestias commodi enim. Esse explicabo repudiandae dolorum iure eligendi,',
        btn: 'Check it out'
    },
    {
        title: 'Enim quaerat laudantium saepe reiciendis. Nostrum, eum. ',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, repellendus. Enim quaerat laudantium saepe reiciendis. Nostrum, eum.',
        btn: 'Footer Action'
    },
    {
        title: ' Cumque, repellendus. ',
        desc: 'Lorem ipsum',
        btn: 'Try it'
    }
]
</script>

<template>
    <div class="ga-tag label green">@SUPPORT</div>
    <h3>Container Grid: 'cards' (3 X 4)</h3>
    <h3>Sub Grid: 'card'</h3>
    <div class="grid cards">
        <div class="sub-grid card" v-for="(card, i) in cardData" :key="card">
            <div class="name">Card {{ i + 1 }}</div>
            <div class="title">{{ card.title }}</div>
            <div class="desc">{{ card.desc }}</div>
            <div class="footer">
                <div class="ga-button btn">{{ card.btn }}</div>
            </div>
        </div>
    </div>
    <hr>
    <h1>snap-scroll</h1>
    <h3>Container: scroll-snap-type: x or y mandatory</h3>
    <h3>items: scroll-snap-align: start or end</h3>
    <div class="slide-views">
        <div class="slide-item" v-for="item in ['red', 'orange', 'deepblue', 'green', 'yellow']" :key="item" :class="`ga-${item}-bg`">{{ item }}</div>
    </div>
</template>

<style lang="scss" scoped>
.grid.cards {
    display: grid;
    width: 800px;
    column-gap: 20px;
    row-gap: 15px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, minmax(50px, auto));

    justify-content: center;
    background-color: #454545;
    margin: 0 auto;
    
    .card {
        background-color: #fff;
        border-radius: 10px;
        line-height: 1.5;
        border: 1px solid #f1f1f1;
        overflow: hidden;
        // grid-column: 1 / 2;
        grid-row: 1 / 6;
        color: #333;
        display: grid;
        grid-template-columns: subgrid;
        grid-template-rows: subgrid;
        .name {
            font-size: 20px;
            font-weight: light;
        }
        .title {
            font-weight: 800;
            font-size: 18px;
        }
        .desc {
            font-size: 13px;
            grid-row: 3 / 5;
        }
        &> div {
            padding: 10px;
            background-color: #ebebeb;
        }
    }
}

.slide-views {
    width: 400px;
    height: 200px;
    margin: 0 auto;
    overflow-x: auto;
    display: flex;
    background-color: #454545;
    scroll-snap-type: x mandatory;
    .slide-item {
        min-width: 100%;
        display: grid;
        justify-content: center;
        align-items: center;
        scroll-snap-align: start;
    }
}
</style>