<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const hoursCurrent = ref('00')
const minutesCurrent = ref('00')
const secondsCurrent = ref('00')
const hoursNext = ref('00')
const minutesNext = ref('00')
const secondsNext = ref('00')
const hoursChanged = ref(false)
const minutesChanged = ref(false)
const secondsChanged = ref(false)
let interval: number

const updateTime = () => {
  const now = new Date()
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0)
  const diff = endOfDay.getTime() - now.getTime()

  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)

  hoursNext.value = String(hours).padStart(2, '0')
  minutesNext.value = String(minutes).padStart(2, '0')
  secondsNext.value = String(seconds).padStart(2, '0')

  hoursChanged.value = hoursCurrent.value !== hoursNext.value
  minutesChanged.value = minutesCurrent.value !== minutesNext.value
  secondsChanged.value = secondsCurrent.value !== secondsNext.value

  //设置延迟，等待动画结束
  setTimeout(() => {
    hoursCurrent.value = hoursNext.value
    minutesCurrent.value = minutesNext.value
    secondsCurrent.value = secondsNext.value
  }, 500)
}

onMounted(() => {
  updateTime()
  interval = setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="hstack">
    <div class="time-group">
      <div class="count" :class="{ changing: hoursChanged }">
        <span class="current top">{{ hoursCurrent[0] }}</span>
        <span class="next top" v-if="hoursChanged">{{ hoursNext[0] }}</span>
      </div>
      <div class="count" :class="{ changing: hoursChanged }">
        <span class="current top">{{ hoursCurrent[1] }}</span>
        <span class="next top" v-if="hoursChanged">{{ hoursNext[1] }}</span>
      </div>
    </div>
    <div class="countdown__separator">:</div>
    <div class="time-group">
      <div class="count" :class="{ changing: minutesChanged }">
        <span class="current top">{{ minutesCurrent[0] }}</span>
        <span class="next top" v-if="minutesChanged">{{ minutesNext[0] }}</span>
      </div>
      <div class="count" :class="{ changing: minutesChanged }">
        <span class="current top">{{ minutesCurrent[1] }}</span>
        <span class="next top" v-if="minutesChanged">{{ minutesNext[1] }}</span>
      </div>
    </div>
    <div class="countdown__separator">:</div>
    <div class="time-group">
      <div class="count" :class="{ changing: secondsChanged }">
        <span class="current top">{{ secondsCurrent[0] }}</span>
        <span class="next top" v-if="secondsChanged">{{ secondsNext[0] }}</span>
      </div>
      <div class="count" :class="{ changing: secondsChanged }">
        <span class="current top">{{ secondsCurrent[1] }}</span>
        <span class="next top" v-if="secondsChanged">{{ secondsNext[1] }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

span {
  display: block;
  border-radius: 0.4rem;
  @include count-down-bg;
}

.count {
  position: relative;
  margin-bottom: -1rem;
  perspective: 1000px;
  height: 2.2em;

  .current,
  .next {
    display: block;
    position: absolute;
    width: 150%;
    height: 60%;
    overflow: hidden;
    backface-visibility: hidden;
  }

  .current.top,
  .next.top {
    top: 0;
    transform-origin: 50% 100%;
  }

  .current.bottom,
  .next.bottom {
    bottom: 0;
    transform-origin: 50% 0;
  }

  &.changing {
    .current.top {
      animation: flipTopCurrent 0.5s forwards;
    }

    .next.top {
      transform: rotateX(90deg);
      animation: flipTopNext 0.5s forwards;
    }

    .current.bottom {
      animation: flipBottomCurrent 0.5s forwards;
    }

    .next.bottom {
      transform: rotateX(-90deg);
      animation: flipBottomNext 0.5s forwards;
    }
  }
}

@keyframes flipTopCurrent {
  to {
    transform: rotateX(-90deg);
  }
}

@keyframes flipTopNext {
  from {
    transform: rotateX(90deg);
  }
  to {
    transform: rotateX(0);
  }
}

@keyframes flipBottomCurrent {
  to {
    transform: rotateX(90deg);
  }
}

@keyframes flipBottomNext {
  from {
    transform: rotateX(-90deg);
  }
  to {
    transform: rotateX(0);
  }
}

div {
  width: 2rem;
}

.hstack {
  display: flex;
  justify-content: center;
  gap: 5px;
  width: 100%;
  text-align: center;

  .countdown__separator {
    font-weight: 700;
    vertical-align: center;
  }
}

.time-group {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
</style>
