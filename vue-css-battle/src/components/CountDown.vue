<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue';
import TimeUnitCard from './TimeUnitCard.vue';

const hoursCurrent = ref('00');
const minutesCurrent = ref('00');
const secondsCurrent = ref('00');
const hoursNext = ref('00');
const minutesNext = ref('00');
const secondsNext = ref('00');
const isHFstDgtChanged = ref(false);
const isMFstDgtChanged = ref(false);
const isSFstDgtChanged = ref(false);
const isHSndDgtChanged = ref(false);
const isMSndDgtChanged = ref(false);
const isSSndDgtChanged = ref(false);
let interval: number;

const updateTime = () => {
  updateTimeUnit(hoursCurrent, hoursNext, isHFstDgtChanged, isHSndDgtChanged, getHours());
  updateTimeUnit(minutesCurrent, minutesNext, isMFstDgtChanged, isMSndDgtChanged, getMinutes());
  updateTimeUnit(secondsCurrent, secondsNext, isSFstDgtChanged, isSSndDgtChanged, getSeconds());

  //设置延迟，等待动画结束
  setTimeout(updateCurrentAndResetSeconds, 500);
};

function getRemainingTimeOfDay() {
  const now = new Date();
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  return endOfDay.getTime() - now.getTime();
}

function getHours() {
  return Math.floor(getRemainingTimeOfDay() / 3600000);
}

function getMinutes() {
  return Math.floor((getRemainingTimeOfDay() % 3600000) / 60000);
}

function getSeconds() {
  return Math.floor((getRemainingTimeOfDay() % 60000) / 1000);
}

function updateTimeUnit(
  current: Ref<string>,
  next: Ref<string>,
  isFstDgtChanged: Ref<boolean>,
  isSndDgtChanged: Ref<boolean>,
  value: number
) {
  next.value = String(value).padStart(2, '0');
  isFstDgtChanged.value = current.value[0] !== next.value[0];
  isSndDgtChanged.value = current.value[1] !== next.value[1];
}

function updateCurrentAndResetSeconds() {
  hoursCurrent.value = hoursNext.value;
  minutesCurrent.value = minutesNext.value;
  secondsCurrent.value = secondsNext.value;
  //这个地方改了超级久才发现
  isSFstDgtChanged.value = false;
  isSSndDgtChanged.value = false;
}

onMounted(() => {
  updateTime();
  interval = setInterval(updateTime, 1000);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="hstack">
    <div class="time-group">
      <TimeUnitCard
        :is-changing="isHFstDgtChanged"
        :time="{ now: hoursCurrent[0], next: hoursNext[0] }"
      ></TimeUnitCard>
      <TimeUnitCard
        :is-changing="isHSndDgtChanged"
        :time="{ now: hoursCurrent[1], next: hoursNext[1] }"
      ></TimeUnitCard>
    </div>
    <div class="countdown__separator">:</div>
    <div class="time-group">
      <TimeUnitCard
        :is-changing="isMFstDgtChanged"
        :time="{ now: minutesCurrent[0], next: minutesNext[0] }"
      ></TimeUnitCard>
      <TimeUnitCard
        :is-changing="isMSndDgtChanged"
        :time="{ now: minutesCurrent[1], next: minutesNext[1] }"
      ></TimeUnitCard>
    </div>
    <div class="countdown__separator">:</div>
    <div class="time-group">
      <TimeUnitCard
        :is-changing="isSFstDgtChanged"
        :time="{ now: secondsCurrent[0], next: secondsNext[0] }"
      ></TimeUnitCard>
      <TimeUnitCard
        :is-changing="isSSndDgtChanged"
        :time="{ now: secondsCurrent[1], next: secondsNext[1] }"
      ></TimeUnitCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

:deep(div) {
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
