<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import TimeUnitCard from './TimeUnitCard.vue';

const hoursCurrent = ref('00');
const minutesCurrent = ref('00');
const secondsCurrent = ref('00');
const hoursNext = ref('00');
const minutesNext = ref('00');
const secondsNext = ref('00');
const hours1Changed = ref(false);
const minutes1Changed = ref(false);
const seconds1Changed = ref(false);
const hours2Changed = ref(false);
const minutes2Changed = ref(false);
const seconds2Changed = ref(false);
let interval: number;

const updateTime = () => {
  const now = new Date();
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  const diff = endOfDay.getTime() - now.getTime();

  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  hoursNext.value = String(hours).padStart(2, '0');
  minutesNext.value = String(minutes).padStart(2, '0');
  secondsNext.value = String(seconds).padStart(2, '0');

  hours1Changed.value = hoursCurrent.value[0] !== hoursNext.value[0];
  hours2Changed.value = hoursCurrent.value[1] !== hoursNext.value[1];

  minutes1Changed.value = minutesCurrent.value[0] !== minutesNext.value[0];
  minutes2Changed.value = minutesCurrent.value[1] !== minutesNext.value[1];

  seconds1Changed.value = secondsCurrent.value[0] !== secondsNext.value[0];
  seconds2Changed.value = secondsCurrent.value[1] !== secondsNext.value[1];

  //设置延迟，等待动画结束
  setTimeout(() => {
    hoursCurrent.value = hoursNext.value;
    minutesCurrent.value = minutesNext.value;
    secondsCurrent.value = secondsNext.value;
    //这个地方改了超级久才发现
    seconds1Changed.value = false;
    seconds2Changed.value = false;
  }, 500);
};

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
        :is-changing="hours1Changed"
        :now="hoursCurrent[0]"
        :next="hoursNext[0]"
      ></TimeUnitCard>
      <TimeUnitCard
        :is-changing="hours2Changed"
        :now="hoursCurrent[1]"
        :next="hoursNext[1]"
      ></TimeUnitCard>
    </div>
    <div class="countdown__separator">:</div>
    <div class="time-group">
      <TimeUnitCard
        :is-changing="minutes1Changed"
        :now="minutesCurrent[0]"
        :next="minutesNext[0]"
      ></TimeUnitCard>
      <TimeUnitCard
        :is-changing="minutes2Changed"
        :now="minutesCurrent[1]"
        :next="minutesNext[1]"
      ></TimeUnitCard>
    </div>
    <div class="countdown__separator">:</div>
    <div class="time-group">
      <TimeUnitCard
        :is-changing="seconds1Changed"
        :now="secondsCurrent[0]"
        :next="secondsNext[0]"
      ></TimeUnitCard>
      <TimeUnitCard
        :is-changing="seconds2Changed"
        :now="secondsCurrent[1]"
        :next="secondsNext[1]"
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
