import { useMeta } from 'vue-meta'

export default (params = {}) => {
  useMeta({
    title: import.meta.env.VITE_APP_VUE_TITLE,
    meta: [
      {vmid: 'description', name: 'description', content: params.description},
      {vmid: 'keywords', name: 'keywords', content: params.keywords},
      {vmid: 'og:type', name: 'og:type', content: 'article'},
      {vmid: 'og:title', name: 'og:title', content: params.title},
      {vmid: 'og:description', name: 'og:description', content: params.description},
      {vmid: 'og:url', name: 'og:url', content: import.meta.env.VITE_DEV_HOST + params.path},
      {vmid: 'og:image', name: 'og:image', content: `${import.meta.env.VITE_DEV_HOST}/assets/test_svg.jpg`}
    ]
  })
}