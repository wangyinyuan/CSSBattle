<script setup lang="ts">
import MenuBar from './components/MenuBar.vue'
import TopBar from './components/TopBar.vue'
import Footer from '@/components/FooterView.vue'
</script>

<template>
  <!-- <div class="navigator-temp">
    <RouterLink to="/">去Home</RouterLink>
    <RouterLink to="/daily">去Daily </RouterLink>
    <RouterLink to="/battles"> 去Battles</RouterLink>
    <RouterLink to="/battle/1">去404</RouterLink>
  </div> -->
  <TopBar />
  <MenuBar />
  <RouterView />
  <Footer />
</template>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';
</style>
