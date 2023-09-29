<script setup lang="ts"></script>

<template>
  <div class="test"></div>
  <RouterLink to="/">去Home</RouterLink>
  <RouterLink to="/daily">去Daily </RouterLink>
  <RouterLink to="/battles"> 去Battles</RouterLink>
  <RouterView />
</template>

<style lang="scss" scoped>
.test {
  background-color: $theme-dark-background;
  width: 200px;
  height: 200px;
  border: 10px solid #a29ffa;
}
</style>
