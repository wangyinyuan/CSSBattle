<script setup lang="ts">
import type { TargetProps } from '@/types/target'
import { onMounted, ref } from 'vue'

const targetInfo = defineProps<TargetProps>()

//设置svg滤镜
const baseFreqY = ref(0.0)

const getRandom = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}
const updateFreqY = () => {
  baseFreqY.value = getRandom(0.0, 0.1)
  requestAnimationFrame(updateFreqY)
}

onMounted(() => {
  //更新滤镜参数
  updateFreqY()
})
</script>

<template>
  <div class="target-container">
    <svg v-if="targetInfo.isLocked">
      <defs>
        <filter id="noise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            :baseFrequency="`0 ${baseFreqY}`"
            result="NOISE"
            numOctaves="2"
          ></feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="NOISE"
            scale="100"
            xChannelSelector="R"
            yChannelSelector="R"
          ></feDisplacementMap>
        </filter>
      </defs>
    </svg>
    <img
      class="target-display"
      :src="targetInfo.image || 'https://cssbattle.dev/images/tv-glitch.png'"
    />
    <img v-if="targetInfo.isLocked" class="lock-icon" src="https://cssbattle.dev/images/lock.svg" />
    <div class="date" v-if="targetInfo.isShowDate">
      <span class="day">{{ targetInfo.day }}</span>
      <span class="month">{{ targetInfo.month }}</span>
    </div>
    <div class="score-status" v-if="!targetInfo.isLocked">
      <div class="score">
        Your high-score<span>{{ targetInfo.highestScore }}</span>
      </div>
      <button></button>
    </div>
    <div v-else class="count-down-view">
      <p>Unlocks in</p>
      <div class="count-down"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
