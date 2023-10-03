<script setup lang="ts">
import ScrollBar from '@/views/Home/components/ScrollBar.vue'
import { useThemeStore } from '@/stores/themeStore'

const themeStore = useThemeStore()
</script>

<template>
  <div class="battles-view">
    <div class="battle-hstack">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        :fill="themeStore.theme === 'dark' ? '#ffdf00' : '#976e06'"
        :color="themeStore.theme === 'dark' ? '#ffdf00' : '#976e06'"
        xmlns="http://www.w3.org/2000/svg"
        :style="`color: ${
          themeStore.theme === 'dark' ? '#ffdf00' : '#976e06'
        }; vertical-align: middle; margin-right: 0px; margin-left: 0px`"
      >
        <path
          fill="currentColor"
          d="M6.2,2.44L18.1,14.34L20.22,12.22L21.63,13.63L19.16,16.1L22.34,19.28C22.73,19.67 22.73,20.3 22.34,20.69L21.63,21.4C21.24,21.79 20.61,21.79 20.22,21.4L17,18.23L14.56,20.7L13.15,19.29L15.27,17.17L3.37,5.27V2.44H6.2M15.89,10L20.63,5.26V2.44H17.8L13.06,7.18L15.89,10M10.94,15L8.11,12.13L5.9,14.34L3.78,12.22L2.37,13.63L4.84,16.1L1.66,19.29C1.27,19.68 1.27,20.31 1.66,20.7L2.37,21.41C2.76,21.8 3.39,21.8 3.78,21.41L7,18.23L9.44,20.7L10.85,19.29L8.73,17.17L10.94,15Z"
        ></path>
      </svg>
      <h1>Battles</h1>
      <p>Compete with players around the world in these nail-biting battles</p>
      <div class="buttons">
        <button>Host a private battle</button>
        <button>Advertise in battle</button>
        <button>My battles</button>
      </div>
    </div>
    <div class="scrollbar">
      <ScrollBar />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';
.battles-view {
  padding-left: 21rem;
  padding-top: 8rem;
  padding-right: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 4rem;

  .battle-hstack {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    gap: 2rem;
    @include text-color($dark-text);
    font-weight: 600;
    font-size: 1.2rem;
    h1 {
      font-size: 2.2rem;
    }
    p {
      @include sidebar-text;
    }

    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      column-gap: 2rem;
      margin: 2rem 0;
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
  .scrollbar {
    margin-top: -3rem;
    margin-bottom: 40%;
  }
}
</style>
