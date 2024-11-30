<script setup>
import { onServerPrefetch, ref } from 'vue'

const title = ref()
// 用于在服务端渲染时预取数据，类似于客户端的 onMounted。
onServerPrefetch(async () => {
  const { data } = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: 'Hello Vite SSR!!!'
      })
    })
  })
  console.log('prefetch ....', data)
  title.value = data
})

if (import.meta.env.SSR) {
  console.log('server ....')
  // ... 仅在服务端执行的逻辑
}
</script>

<template>
  <h1>{{ title }}</h1>
</template>

<style scoped></style>
