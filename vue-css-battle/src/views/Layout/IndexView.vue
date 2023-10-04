<script setup lang="ts">
import MenuBar from './components/MenuBar.vue'
import TopBar from './components/TopBar.vue'
import Footer from '@/components/FooterView.vue'
</script>

<template>
  <TopBar />
  <MenuBar />
  <RouterView />
  <Footer />
</template>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';
</style>
