<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import ConfettiExplosion from 'vue-confetti-explosion';

const windowWidth = ref(window.innerWidth);
const xValue = ref(windowWidth.value / 2);

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
  xValue.value = windowWidth.value / 2;
};

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth);
});
</script>

<template>
  <ConfettiExplosion
    :particleCount="400"
    :duration="5000"
    :stageHeight="1600"
    :force="0.7"
    :style="{
      transform: `translate(${xValue}px, 0px)`
    }"
  />
</template>

<style lang="scss"></style>
