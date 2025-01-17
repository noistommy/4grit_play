<script setup>
import { onMounted, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router'
import { RouterLink, RouterView } from 'vue-router'
import setMeta from '@/meta'


const route = useRoute()
console.log(route)
onMounted(() => {
  setMeta({
    title: 'NT TEST DEV',
    description: '프론트엔드 테스트',
    path: route.path,
    keywords: 'frontend, vue3'
  })
})

const { proxy } = getCurrentInstance()

// composition api or setup


const testSnackbar = () => {
  // proxy.$snackbars.show('success', 'tesat snackbars', {})
}

</script>

<template>
  <metainfo />
  <div class="pane-layout layout-v">
    <header>
      <nav @click="testSnackbar">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/font">About</RouterLink>
        <RouterLink to="/draw">SVG Draw</RouterLink>
        <RouterLink to="/flexible">Flexible View</RouterLink>
        <RouterLink to="/ui-switch">UI_Switch</RouterLink>
        <RouterLink to="/ui-pagination">UI_Pagination</RouterLink>
        <RouterLink to="/ui-select-box">UI_SelectBox</RouterLink>
        <RouterLink to="/fire-cracker">FireCracker</RouterLink>
        <RouterLink to="/side-nav-layout">SideNavLayout</RouterLink>
        <RouterLink to="/grid-system">GridSystem</RouterLink>
        <RouterLink to="/grid-system2">GridSystem2</RouterLink>
        <RouterLink to="/snackbar">Snackbar</RouterLink>
        <RouterLink to="/new-style">NewStyle</RouterLink>
        <RouterLink to="/scroll-timeline">ScrollTimeline</RouterLink>
        <RouterLink to="/sub-grid">SubGrid</RouterLink>
      </nav>
    </header>
    <div class="handle-pane"></div>
    <main>
      <RouterView />
    </main>
  </div>
  <!-- <div class="snackbars top-full">
    <div class="snack">test</div>
  </div> -->
  
</template>

<style lang="scss" scoped>
#app {
  height: 100vh;
}
main {
}
nav {
  display: flex;
  width: 100%;
  text-align: center;
  padding: 1rem;
  flex-wrap: wrap;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.pane-layout {
  display: flex;
  &.layout-v {
    flex-direction: column;
    .handle-pane {
      width: 100%;
      height: 5px;
      cursor: row-resize;
      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
  }
}

</style>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100vh - 80px);
  background-color: #f2f2f2;
}
</style>
