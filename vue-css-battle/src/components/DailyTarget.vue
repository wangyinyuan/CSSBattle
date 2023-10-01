<script setup lang="ts">
import type { TargetProps } from '@/types/target'
import { onMounted, ref, onUnmounted } from 'vue'
import CountDown from '@/components/CountDown.vue'

const targetInfo = defineProps<TargetProps>()

//设置svg滤镜
const baseFreqY = ref(0.0)
let updateFreqYId: number

const getRandom = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}
const updateFreqY = () => {
  baseFreqY.value = getRandom(0.0, 0.1)
}

onMounted(() => {
  //更新滤镜参数
  updateFreqYId = setInterval(() => {
    updateFreqY()
  }, 250)
})

//清除定时器
onUnmounted(() => {
  clearInterval(updateFreqYId)
})
</script>

<template>
  <div class="target-container" :class="{ trans: targetInfo.isTransparent }">
    <div class="tv-glitch">
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
      <img
        v-if="targetInfo.isLocked"
        class="lock-icon"
        src="https://cssbattle.dev/images/lock.svg"
      />

      <div class="date" v-if="targetInfo.isShowDate">
        <span class="day">{{ targetInfo.day }}</span>
        <span class="month">{{ targetInfo.month }}</span>
      </div>
    </div>
    <div class="score-status" v-if="!targetInfo.isLocked">
      <div class="score">
        Your high-score<span>{{ targetInfo.highestScore }}</span>
      </div>
      <button></button>
    </div>
    <div v-else class="count-down-view">
      <p>Unlocks in</p>
      <div class="count-down">
        <CountDown />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.target-container {
  @include target-bg;
  @include target-text;
  padding: 1rem;
  position: relative;
  display: block;
  &.trans {
    @include target-bg-trans;
    @include target-border-trans;
    width: 240px;
    border-radius: 1rem;
    overflow: hidden;
    .count-down-view {
      padding: 1rem 1rem 0.5rem;
      font-size: 1.3rem;
      font-weight: 500;
      color: #6b7b8e;
      p {
        text-align: center;
      }
      .count-down {
        width: auto;
        margin-top: 0.5rem;
      }
    }
  }

  .tv-glitch {
    position: relative;
    margin: 0 auto;
    width: 100%;
    background-color: #252e36d6;
    display: grid;
    place-content: center;
    border-radius: 1rem;
    box-shadow: inset 0 0 2px #252e36;
    opacity: 0.8;
  }
  svg {
    position: absolute;
    width: 100%;
  }
  .target-display {
    aspect-ratio: 4/3;
    border-radius: 0.7rem;
    filter: url(#noise);
    opacity: 0.6;
    width: 100%;
  }
  .lock-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
