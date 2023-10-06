<script setup lang="ts">
import { userGameInfo } from '@/data/user'
import { useThemeStore } from '@/stores/themeStore'
import type { UserGameInfo } from '@/types/userProfile'
import { ArrowDown } from '@element-plus/icons-vue'
import { ref } from 'vue'

//获取主题色
const themeStore = useThemeStore()
//选中的栏目
const selectedItem = ref(0)

//获取排名数据
const userGameList = ref<UserGameInfo[]>([])
userGameList.value = userGameInfo
</script>

<template>
  <div class="leader-container">
    <div class="leader-header">
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
          d="M2.3418 5.86914C2.3418 4.77051 3.08008 4.07617 4.23145 4.07617H5.83984C6.09473 3.14453 6.8418 2.6084 7.98438 2.6084H15.0156C16.1582 2.6084 16.9053 3.15332 17.1602 4.07617H18.7686C19.9199 4.07617 20.6582 4.77051 20.6582 5.86914C20.6582 9.34961 18.8477 11.7402 15.2881 12.8564C14.708 13.6123 14.0312 14.2451 13.3457 14.6758V18.0244H14.7256C16.0176 18.0244 16.7822 18.8242 16.7822 20.0811V21.6543C16.7822 22.2432 16.3252 22.6738 15.7627 22.6738H7.2373C6.6748 22.6738 6.21777 22.2432 6.21777 21.6543V20.0811C6.21777 18.8242 6.98242 18.0244 8.27441 18.0244H9.6543V14.6758C8.96875 14.2451 8.29199 13.6123 7.71191 12.8564C4.16113 11.7402 2.3418 9.34961 2.3418 5.86914ZM4.1875 6.2207C4.1875 8.00488 4.91699 9.38477 6.30566 10.2285C5.94531 9.38477 5.7168 8.43555 5.7168 7.44238V5.99219H4.40723C4.27539 5.99219 4.1875 6.08887 4.1875 6.2207ZM16.6943 10.2285C18.083 9.38477 18.8213 8.00488 18.8213 6.2207C18.8213 6.08887 18.7246 5.99219 18.5928 5.99219H17.2832V7.44238C17.2832 8.43555 17.0547 9.38477 16.6943 10.2285Z"
          fill="currentColor"
        ></path>
      </svg>
      <h1>Leaderboards</h1>
    </div>
    <div class="leader-body">
      <div class="swiper-bars">
        <div :class="{ selected: selectedItem === 0 }" @click="selectedItem = 0">All-time</div>
        <div :class="{ selected: selectedItem === 1 }" @click="selectedItem = 1">Streak</div>
        <div class="dropdown">
          <el-dropdown size="large">
            <span class="el-dropdown-link">
              Battle
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu
                :style="{ background: `${themeStore.theme === 'dark' ? '#27313a' : '#edf2f7'}` }"
              >
                <el-dropdown-item
                  :style="{
                    color: `${themeStore.theme === 'dark' ? 'rgb(255,255,255)' : 'rgb(5,5,5)'}`
                  }"
                >
                  #27-Relative
                </el-dropdown-item>
                <el-dropdown-item
                  :style="{
                    color: `${themeStore.theme === 'dark' ? 'rgb(255,255,255)' : 'rgb(5,5,5)'}`
                  }"
                >
                  #26-Initial
                </el-dropdown-item>
                <el-dropdown-item
                  :style="{
                    color: `${themeStore.theme === 'dark' ? 'rgb(255,255,255)' : 'rgb(5,5,5)'}`
                  }"
                >
                  #25-Flex
                </el-dropdown-item>
                <el-dropdown-item
                  :style="{
                    color: `${themeStore.theme === 'dark' ? 'rgb(255,255,255)' : 'rgb(5,5,5)'}`
                  }"
                >
                  #23-Contain
                </el-dropdown-item>
                <el-dropdown-item
                  :style="{
                    color: `${themeStore.theme === 'dark' ? 'rgb(255,255,255)' : 'rgb(5,5,5)'}`
                  }"
                >
                  #22-Grid
                </el-dropdown-item>
                <el-dropdown-item
                  :style="{
                    color: `${themeStore.theme === 'dark' ? 'rgb(255,255,255)' : 'rgb(5,5,5)'}`
                  }"
                >
                  #21-Rotate
                </el-dropdown-item>
                <el-dropdown-item
                  :style="{
                    color: `${themeStore.theme === 'dark' ? 'rgb(255,255,255)' : 'rgb(5,5,5)'}`
                  }"
                >
                  #20-Hover
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="dropdown">
          <el-dropdown size="large">
            <span class="el-dropdown-link">
              Target
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu
                :style="{
                  background: `${themeStore.theme === 'dark' ? '#27313a' : '#edf2f7'}`
                }"
              >
                <el-dropdown-item
                  :style="{
                    color: `${themeStore.theme === 'dark' ? 'rgb(255,255,255)' : 'rgb(5,5,5)'}`
                  }"
                >
                  #170-Party Hat
                </el-dropdown-item>
                <el-dropdown-item
                  :style="{
                    color: `${themeStore.theme === 'dark' ? 'rgb(255,255,255)' : 'rgb(5,5,5)'}`
                  }"
                >
                  #169-Abstract Plate
                </el-dropdown-item>
                <el-dropdown-item
                  :style="{
                    color: `${themeStore.theme === 'dark' ? 'rgb(255,255,255)' : 'rgb(5,5,5)'}`
                  }"
                >
                  #168-Carpet
                </el-dropdown-item>
                <el-dropdown-item
                  :style="{
                    color: `${themeStore.theme === 'dark' ? 'rgb(255,255,255)' : 'rgb(5,5,5)'}`
                  }"
                >
                  #167-React India
                </el-dropdown-item>
                <el-dropdown-item
                  :style="{
                    color: `${themeStore.theme === 'dark' ? 'rgb(255,255,255)' : 'rgb(5,5,5)'}`
                  }"
                >
                  #166-Flow
                </el-dropdown-item>
                <el-dropdown-item
                  :style="{
                    color: `${themeStore.theme === 'dark' ? 'rgb(255,255,255)' : 'rgb(5,5,5)'}`
                  }"
                >
                  #165-Pyramid
                </el-dropdown-item>
                <el-dropdown-item
                  :style="{
                    color: `${themeStore.theme === 'dark' ? 'rgb(255,255,255)' : 'rgb(5,5,5)'}`
                  }"
                >
                  #164-Rangoli
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="top-leaders"></div>
      <div class="leader-list">
        <div class="leader-item" v-for="item in userGameList" :key="item.id">
          <div class="user-info">
            <img :src="item.avatar" alt="" />
            <span class="user-name">{{ item.name }}</span>
          </div>
          <div class="total-score">{{ item.totalScore }}</div>
          <div class="total-target">({{ item.totalTarget }} Targets)</div>
          <div class="user-rank">#{{ item.rank }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';

.leader-container {
  padding-left: 21rem;
  padding-top: 8rem;
  padding-right: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 4rem;
  @include header-number;
  .leader-header {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;

    h1 {
      @include text-color($dark-text);
      font-size: 2.4rem;
    }
  }
  .leader-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
    .swiper-bars {
      padding: 1rem 0.5rem;
      width: 35rem;
      border: 0;
      border-radius: 1rem;
      @include previous-radio-bg;
      @include previous-radio-box-shadow;
      font-size: 1.2rem;
      font-weight: 600;
      display: flex;
      justify-content: space-around;
      align-items: center;
      div:not(.dropdown) {
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
      .el-dropdown-link {
        @include header-number;
        font-size: 1.2rem;
      }
    }

    .leader-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      margin-bottom: 4rem;
      .leader-item {
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 6rem;
        width: 80%;
        margin: 0 auto;
        flex-direction: row;
        border: 0;
        border-radius: 1.5rem;
        padding: 0.8rem 2rem;
        @include previous-radio-bg;
        @include previous-radio-shadow;
        .user-info {
          display: flex;
          flex: 1;
          gap: 1.5rem;
          align-items: center;

          img {
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 50%;
            cursor: pointer;
          }
          .user-name {
            @include text-color($dark-text);
            font-weight: 700;
            cursor: pointer;
            font-size: 1.5rem;
          }
        }
        .total-score {
          font-size: 1.4rem;
          font-weight: 600;
        }
        .total-target {
          font-size: 1.4rem;
          font-weight: 600;
        }
        .user-rank {
          font-size: 2rem;
          font-weight: 800;
          @include sidebar-text;
        }
      }
    }
  }
}
</style>
