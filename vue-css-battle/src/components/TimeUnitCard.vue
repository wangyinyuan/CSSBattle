<script setup lang="ts">
import type { TimeUnitCardProps } from '@/types/timeUnit';

const props = defineProps<TimeUnitCardProps>();
</script>

<template>
  <div class="count" :class="{ changing: props.isChanging }">
    <span class="current top">{{ props.now }}</span>
    <span class="next top" v-show="props.isChanging">{{ props.next }}</span>
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
</style>
