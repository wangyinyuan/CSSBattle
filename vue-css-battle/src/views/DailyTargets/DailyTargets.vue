<script setup lang="ts">
import DailyTarget from '@/components/DailyTarget.vue';
import { targetListDaily, targetListDailyPanel } from '@/data/targets';
import { useThemeStore } from '@/stores/themeStore';
import { ref } from 'vue';

const themeStore = useThemeStore();
//展示切换
const selectedItem = ref(0);
console.log('targetListDailyPanel', targetListDailyPanel);
</script>

<template>
  <div class="daily">
    <div class="daily-targets">
      <div class="daily-hstack">
        <div class="stack-info">
          <div class="icon">
            <svg
              width="32"
              height="32"
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
            <p class="title">Daily Targets</p>
            <p>A new target everyday for you to unwind. No leaderboards, no competition</p>
          </div>
        </div>
      </div>
      <div class="daily-panel">
        <div class="targets">
          <DailyTarget v-bind="item" v-for="item in targetListDailyPanel" :key="item.id" />
        </div>
      </div>
    </div>
    <div class="previous-targets">
      <div class="previous-hstack">
        <div class="stack-info">
          <p class="title">
            Previous targets
            <img src="https://cssbattle.dev/images/pro-badge.svg" alt="" />
          </p>
          <p>
            Want more? Play the previously released targets. You can also view the top solutions of
            all previous targets
          </p>
        </div>
        <div class="radio-tabs">
          <div :class="{ selected: selectedItem === 0 }" @click="selectedItem = 0">All targets</div>
          <div :class="{ selected: selectedItem === 1 }" @click="selectedItem = 1">Not Played</div>
          <div :class="{ selected: selectedItem === 2 }" @click="selectedItem = 2">Played</div>
        </div>
      </div>
      <div class="previous-targets-list">
        <DailyTarget v-bind="item" v-for="item in targetListDaily" :key="item.id" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';
.daily {
  padding-left: 21rem;
  padding-top: 8rem;
  padding-right: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 4rem;
  .daily-targets {
    display: flex;
    flex-direction: column;
    row-gap: 6rem;
    .stack-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      align-items: center;
      gap: 1rem;
      .icon {
        width: auto;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .text {
        padding: 0.5rem 0;
        height: 5rem;
        @include sidebar-text;
        font-size: 1.2rem;
        font-weight: 600;
        line-height: 2;
        .title {
          @include text-color($dark-text);
          font-size: 2.2rem;
          line-height: 1.4;
          margin-bottom: 1rem;
        }
      }
    }
    .daily-panel {
      width: 100%;
      height: auto;
      min-width: max-content;
      min-height: 415px;
      position: relative;
      align-self: center;
      @include daily-target-panel-bg;
      box-shadow:
        0 0 30px rgba(255, 223, 0, 0),
        0 20px 50px rgba(0, 0, 0, 0.1),
        inset 0 1px 3px hsla(0, 0%, 100%, 0.1);
      border-radius: 1rem;
      backdrop-filter: blur(20px);
      .targets {
        width: 100%;
        padding: 3rem;
        min-height: 450px;
        display: flex;
        gap: 2rem;
        justify-content: center;
        align-items: flex-start;
      }
    }
  }
  .previous-targets {
    display: flex;
    flex-direction: column;
    row-gap: 5rem;
    .previous-hstack {
      width: 100%;
      display: flex;
      line-height: 1.4;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      column-gap: 3rem;
      @include sidebar-text;
      font-size: 1.2rem;
      font-weight: 600;
      .stack-info {
        max-width: 60%;
        img {
          margin-left: 1rem;
        }
        .title {
          font-size: 1.5rem;
          @include text-color($dark-text);
          margin-bottom: 1rem;
        }
      }

      .radio-tabs {
        padding: 0.5rem;
        border: 0;
        border-radius: 1rem;
        @include previous-radio-bg;
        @include previous-radio-box-shadow;
        div {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          position: relative;
          cursor: pointer;
          display: inline-block;
          transition:
            color 0.1s ease-in-out,
            background-color 0.1s ease-in-out,
            box-shadow 0.1s ease-in-out;
          &.selected {
            @include header-button-bg;
            @include text-color($dark-text);
            @include previous-radio-shadow;
          }
        }
      }
    }
    .previous-targets-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
      gap: 4rem;
      width: 100%;
      margin-bottom: 5rem;
    }
  }
}
</style>
