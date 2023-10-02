<script setup lang="ts">
import CountDown from '@/components/CountDown.vue'
import type { TargetProps } from '@/types/target'
import { onMounted, onUnmounted, ref } from 'vue'

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
  <div
    class="target-container"
    :class="{ trans: targetInfo.isTransparent, today: targetInfo.isToday }"
  >
    <div :class="{ 'tv-glitch': targetInfo.isLocked }" class="target-body">
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
        :class="{ 'lock-status': targetInfo.isLocked }"
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
        Your high-score<span :class="{ today: targetInfo.isToday }">{{
          targetInfo.highestScore
        }}</span>
      </div>
      <img v-if="targetInfo.isPlus" src="https://cssbattle.dev/images/pro-badge.svg" />
      <button v-else>
        <div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#fff"
            color="#fff"
            xmlns="http://www.w3.org/2000/svg"
            style="color: #fff"
          >
            <path
              d="M6.73633 20.2754C5.91016 20.2754 5.24219 19.6426 5.24219 18.5879V5.73828C5.24219 4.68359 5.91016 4.05957 6.73633 4.05957C7.14062 4.05957 7.50977 4.18262 8.00195 4.46387L18.5488 10.5811C19.3574 11.0557 19.7617 11.4863 19.7617 12.1631C19.7617 12.8486 19.3574 13.2793 18.5488 13.7451L8.00195 19.8623C7.50977 20.1436 7.14062 20.2754 6.73633 20.2754Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </button>
    </div>
    <div v-if="targetInfo.isLocked" class="count-down-view">
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
  transition: transform 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  @include target-bg-large;
  @include target-text;
  @include target-border-shadow;
  padding: 1rem;
  position: relative;
  display: block;
  max-width: 320px;
  min-width: 310px;
  border-radius: 1.8rem;
  @include target-border-today;
  .target-body {
    .target-display {
      aspect-ratio: 4/3;
      border-radius: 1rem;
      width: 100%;
      margin-bottom: 1rem;
    }
  }

  &.trans {
    @include target-bg-trans;
    @include target-border-trans;
    max-width: 240px;
    min-width: 230px;
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

  .score-status {
    display: flex;
    min-height: 4rem;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    .score {
      flex-shrink: 2;
      display: flex;
      flex-flow: column wrap;
      row-gap: 0.3rem;
      font-weight: 500;
      font-size: 1.2rem;
      @include header-text;
      span {
        @include target-text;
      }
      .today {
        @include target-text-today;
      }
    }
    button {
      position: relative;
      border: 0;
      height: 3rem;
      width: 3rem;
      box-shadow: inset 1px 1px 2px hsla(0, 0%, 100%, 0.1);
      border-radius: 90%;
      transition:
        transform 0.2s ease-in-out,
        background-color 0.2s ease-in-out;
      cursor: pointer;
      background-color: $common-button-bg;
      &:hover {
        transform: translate(0, -3px);
        background-color: $common-button-bg-hover;
      }
      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
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
  .lock-status {
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
