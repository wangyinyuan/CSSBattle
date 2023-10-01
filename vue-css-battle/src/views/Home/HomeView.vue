<script setup lang="ts">
import DailyTarget from '@/components/DailyTarget.vue'
import { ref } from 'vue'
import type { TargetProps } from '@/types/target'
import { useThemeStore } from '@/stores/themeStore'

const themeStore = useThemeStore()

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
      <div class="daily-hstack">
        <div class="stack-info">
          <div class="icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#ffdf00"
              color="#ffdf00"
              xmlns="http://www.w3.org/2000/svg"
              :style="`color: ${
                themeStore.theme === 'dark' ? '#ffdf00' : '#976e06'
              }; vertical-align: middle; margin-right: 0px; margin-left: 0px`"
            >
              <path
                fill="currentColor"
                d="M5.374 20.065c-2.004 0-3.103-1.09-3.103-3.085V6.346c0-1.995 1.1-3.085 3.103-3.085h12.243c2.013 0 3.103 1.09 3.103 3.085V16.98c0 1.996-1.09 3.085-3.103 3.085H5.374Zm.167-2.267h11.91c.65 0 1.001-.317 1.001-1.01V8.973c0-.695-.351-1.011-1.002-1.011H5.541c-.66 0-1.002.316-1.002 1.01v7.814c0 .694.343 1.01 1.002 1.01Zm4.307-6.987c-.326 0-.44-.097-.44-.422V9.87c0-.316.114-.422.44-.422h.518c.317 0 .43.106.43.422v.519c0 .325-.113.421-.43.421h-.518Zm2.795 0c-.326 0-.44-.097-.44-.422V9.87c0-.316.114-.422.44-.422h.518c.316 0 .43.106.43.422v.519c0 .325-.114.421-.43.421h-.518Zm2.794 0c-.325 0-.439-.097-.439-.422V9.87c0-.316.114-.422.44-.422h.51c.325 0 .439.106.439.422v.519c0 .325-.114.421-.44.421h-.51Zm-8.384 2.75c-.325 0-.43-.096-.43-.421v-.519c0-.316.105-.422.43-.422h.518c.325 0 .431.106.431.422v.519c0 .325-.106.421-.43.421h-.52Zm2.795 0c-.326 0-.44-.096-.44-.421v-.519c0-.316.114-.422.44-.422h.518c.317 0 .43.106.43.422v.519c0 .325-.113.421-.43.421h-.518Zm2.795 0c-.326 0-.44-.096-.44-.421v-.519c0-.316.114-.422.44-.422h.518c.316 0 .43.106.43.422v.519c0 .325-.114.421-.43.421h-.518Zm2.794 0c-.325 0-.439-.096-.439-.421v-.519c0-.316.114-.422.44-.422h.51c.325 0 .439.106.439.422v.519c0 .325-.114.421-.44.421h-.51Zm-8.384 2.752c-.325 0-.43-.106-.43-.422v-.519c0-.325.105-.422.43-.422h.518c.325 0 .431.097.431.422v.519c0 .316-.106.421-.43.421h-.52Zm2.795 0c-.326 0-.44-.106-.44-.422v-.519c0-.325.114-.422.44-.422h.518c.317 0 .43.097.43.422v.519c0 .316-.113.421-.43.421h-.518Zm2.795 0c-.326 0-.44-.106-.44-.422v-.519c0-.325.114-.422.44-.422h.518c.316 0 .43.097.43.422v.519c0 .316-.114.421-.43.421h-.518Z"
              ></path>
            </svg>
          </div>
          <div class="text">
            <p class="title">Daily targets</p>
            <p>A new target everyday for you to unwind. No leaderboards, no competition</p>
          </div>
        </div>
        <button>View all daily targets</button>
      </div>
      <div class="home-daily-panel">
        <div class="targets"><DailyTarget v-bind="targetLock" /></div>
      </div>
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
  .daily-targets {
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    .home-daily-panel {
      width: auto;
      height: auto;
      position: relative;
      @include target-panel-bg;
      @include target-panel-box-shadow;
      border-radius: 1rem;
      backdrop-filter: blur(20px);
      overflow: hidden;
      .targets {
        padding: 3rem;
        min-height: 450px;
        overflow-x: auto;
        display: flex;
        gap: 2rem;
        justify-content: flex-start;
        align-items: flex-start;
      }
    }
  }

  .daily-hstack {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .stack-info {
      margin-right: -2rem;
      padding-right: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      .icon {
        @include daily-icon-bg;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .text {
        padding: 0.5rem 0;
        height: 5rem;
        @include sidebar-text;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 1.5;
        .title {
          @include text-color($dark-text);
          font-weight: 600;
          font-size: 1.7rem;
          line-height: 1.4;
        }
      }
    }
    button {
      border: 0;
      border-radius: 40px;
      box-shadow: inset 1px 1px 2px hsla(0, 0%, 100%, 0.1);
      @include header-button-bg;
      @include text-color($dark-text);
      cursor: pointer;
      line-height: 1.2;
      transition:
        transform 0.2s ease-in-out,
        background-color 0.2s ease-in-out;
      font-weight: 600;
      letter-spacing: 0.2px;
      text-align: center;
      &:hover {
        transform: translate(0, -3px);
        @include header-button-bg-hover;
      }
      height: 48px;
      width: 13rem;
    }
  }
}
</style>
