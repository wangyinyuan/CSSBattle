<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const hoursCurrent = ref('00')
const minutesCurrent = ref('00')
const secondsCurrent = ref('00')
const hoursNext = ref('00')
const minutesNext = ref('00')
const secondsNext = ref('00')
const hours1Changed = ref(false)
const minutes1Changed = ref(false)
const seconds1Changed = ref(false)
const hours2Changed = ref(false)
const minutes2Changed = ref(false)
const seconds2Changed = ref(false)
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

  hours1Changed.value = hoursCurrent.value[0] !== hoursNext.value[0]
  hours2Changed.value = hoursCurrent.value[1] !== hoursNext.value[1]

  minutes1Changed.value = minutesCurrent.value[0] !== minutesNext.value[0]
  minutes2Changed.value = minutesCurrent.value[1] !== minutesNext.value[1]

  seconds1Changed.value = secondsCurrent.value[0] !== secondsNext.value[0]
  seconds2Changed.value = secondsCurrent.value[1] !== secondsNext.value[1]

  //设置延迟，等待动画结束
  setTimeout(() => {
    hoursCurrent.value = hoursNext.value
    minutesCurrent.value = minutesNext.value
    secondsCurrent.value = secondsNext.value
    //这个地方改了超级久才发现
    seconds1Changed.value = false
    seconds2Changed.value = false
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
      <div class="count" :class="{ changing: hours1Changed }">
        <span class="current top">{{ hoursCurrent[0] }}</span>
        <span class="next top" v-show="hours1Changed">{{ hoursNext[0] }}</span>
      </div>
      <div class="count" :class="{ changing: hours2Changed }">
        <span class="current top">{{ hoursCurrent[1] }}</span>
        <span class="next top" v-show="hours2Changed">{{ hoursNext[1] }}</span>
      </div>
    </div>
    <div class="countdown__separator">:</div>
    <div class="time-group">
      <div class="count" :class="{ changing: minutes1Changed }">
        <span class="current top">{{ minutesCurrent[0] }}</span>
        <span class="next top" v-show="minutes1Changed">{{ minutesNext[0] }}</span>
      </div>
      <div class="count" :class="{ changing: minutes2Changed }">
        <span class="current top">{{ minutesCurrent[1] }}</span>
        <span class="next top" v-show="minutes2Changed">{{ minutesNext[1] }}</span>
      </div>
    </div>
    <div class="countdown__separator">:</div>
    <div class="time-group">
      <div class="count" :class="{ changing: seconds1Changed }">
        <span class="current top">{{ secondsCurrent[0] }}</span>
        <span class="next top" v-show="seconds1Changed">{{ secondsNext[0] }}</span>
      </div>
      <div class="count" :class="{ changing: seconds2Changed }">
        <span class="current top">{{ secondsCurrent[1] }}</span>
        <span class="next top" v-show="seconds2Changed">{{ secondsNext[1] }}</span>
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
