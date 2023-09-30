<script setup lang="ts">
import MenuBar from './components/MenuBar.vue'
import TopBar from './components/TopBar.vue'
import Footer from '@/components/FooterView.vue'
</script>

<template>
  <div class="navigator-temp">
    <RouterLink to="/">去Home</RouterLink>
    <RouterLink to="/daily">去Daily </RouterLink>
    <RouterLink to="/battles"> 去Battles</RouterLink>
    <RouterLink to="/battle/1">去404</RouterLink>
  </div>
  <TopBar />
  <MenuBar />
  <RouterView />
  <Footer />
</template>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';
//临时导航
.navigator-temp {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 50px;
  height: 300px;
  background-color: #fa9;
  border-bottom: 1px solid #e8e8e8;
  position: fixed;
  right: 0;
  top: 40vh;
}
</style>
