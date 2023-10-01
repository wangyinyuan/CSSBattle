<script setup lang="ts">
import DailyTarget from '@/components/DailyTarget.vue'
import { ref } from 'vue'
import type { TargetProps } from '@/types/target'

const targetLock = ref<TargetProps>({
  month: 'JAN',
  day: '01',
  highestScore: 'Not Played',
  isLocked: true,
  isTransparent: true
})
</script>

<template>
  <div class="home-view">
    <div class="welcome-board">
      <img src="https://cssbattle.dev/images/welcome.jpg" alt="five pixel guys in the forest" />
      <article>
        <h1>Welcome to CSSBattle</h1>
        <p>
          The funnest multiplayer game with 300K+ web designers & developers. Replicate the target
          images using CSS - the shorter your code, the higher your score! Happy coding!
        </p>
        <button>Sign In / Sign Up</button>
      </article>
    </div>
    <div class="separator"></div>
    <div class="daily-targets">
      <DailyTarget v-bind="targetLock" />
    </div>
    <div class="scrollbar"></div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';

.separator {
  width: 100%;
  height: 2px;
  background-color: $common-separator-bg;
  opacity: 0.7;
  margin: 0 auto;
}
.home-view {
  padding-left: 21rem;
  padding-top: 8rem;
  padding-right: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 4rem;
  .welcome-board {
    display: flex;
    align-items: center;
    gap: 2rem;
    img {
      border-radius: 1rem;
      width: 300px;
    }

    article {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 1.5rem;
      h1 {
        @include text-color($dark-text);
        letter-spacing: 0px;
        font-size: 2.5rem;
        font-weight: 600;
        text-align: left;
        font-style: normal;
      }
      p {
        @include sidebar-text;
        font-size: 1.3rem;
        font-weight: 500;
        text-align: left;
        line-height: 1.4;
      }
      button {
        border: 0;
        border-radius: 40px;
        box-shadow: inset 1px 1px 2px hsla(0, 0%, 100%, 0.1);
        background-color: $common-button-bg;
        color: $dark-text;
        cursor: pointer;
        line-height: 1.2;
        transition:
          transform 0.2s ease-in-out,
          background-color 0.2s ease-in-out;
        font-weight: 600;
        letter-spacing: 0.2px;
        text-align: left;
        &:hover {
          transform: translate(0, -3px);
          background-color: $common-button-bg-hover;
        }
        height: 48px;
        width: 10rem;
      }
    }
  }
}
</style>
