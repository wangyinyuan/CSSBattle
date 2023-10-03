<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TargetProps } from '@/types/target'

enum Selection {
  Home,
  Daily,
  Battles,
  Leaderboards,
  Learn,
  None
}
//接受props
const props = withDefaults(
  defineProps<
    TargetProps & {
      selectedItem: Selection
    }
  >(),
  {
    id: ''
  }
)
//是否影藏logo
const isLogoHidden = computed(() => {
  return props.id !== ''
})
//当前选中的菜单
const selectedItem = ref<Selection>(props.selectedItem || Selection.Home)
</script>

<template>
  <div class="sidebar-container" :class="{ lower: isLogoHidden }">
    <div class="logo-container" v-if="!isLogoHidden">
      <img src="https://cssbattle.dev/images/logo-new.svg" alt="logo" />
    </div>
    <div class="menu-container">
      <div class="menu">
        <RouterLink to="/" class="custom-link"
          ><div
            class="home"
            :class="{ selected: selectedItem === Selection.Home }"
            @click="selectedItem = Selection.Home"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="undefined"
              xmlns="http://www.w3.org/2000/svg"
              style="vertical-align: middle; margin-right: 0px; margin-left: 0px"
            >
              <path
                d="M1.47461 10.8613C1.47461 10.5542 1.62402 10.2305 1.90625 9.99805L10.5557 2.73486C11.4355 1.99609 12.5811 1.99609 13.4609 2.73486L16.939 5.65674V4.38672C16.939 3.99658 17.1963 3.74756 17.5864 3.74756H19.1138C19.4956 3.74756 19.7529 3.99658 19.7529 4.38672V8.01416L22.0938 9.98975C22.376 10.2222 22.5254 10.5376 22.5254 10.8696C22.5254 11.4839 22.0771 11.8823 21.438 11.8823C21.1392 11.8823 20.8403 11.7329 20.5913 11.5171L12.4731 4.70215C12.166 4.44482 11.8423 4.44482 11.5518 4.70215L3.41699 11.5171C3.16797 11.7329 2.86914 11.8823 2.56201 11.8823C1.89795 11.8823 1.47461 11.4424 1.47461 10.8613ZM4.33008 18.415V12.5298L11.4688 6.54492C11.8008 6.2627 12.1992 6.25439 12.5396 6.54492L19.6699 12.5298V18.415C19.6699 19.6768 18.8315 20.4653 17.5034 20.4653H6.49658C5.16846 20.4653 4.33008 19.6768 4.33008 18.415ZM14.2329 18.3237V13.1108C14.2329 12.7124 13.9839 12.4551 13.5854 12.4551H10.4229C10.0244 12.4551 9.75879 12.7124 9.75879 13.1108V18.3237H14.2329Z"
                fill="currentColor"
              ></path></svg
            ><span>Home</span>
          </div></RouterLink
        >
        <div class="selection-header">PLAY</div>
        <RouterLink class="custom-link" to="/daily"
          ><div
            class="daily"
            :class="{ selected: selectedItem === Selection.Daily }"
            @click="selectedItem = Selection.Daily"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="undefined"
              xmlns="http://www.w3.org/2000/svg"
              style="vertical-align: middle; margin-right: 0px; margin-left: 0px"
            >
              <path
                fill="currentColor"
                d="M5.374 20.065c-2.004 0-3.103-1.09-3.103-3.085V6.346c0-1.995 1.1-3.085 3.103-3.085h12.243c2.013 0 3.103 1.09 3.103 3.085V16.98c0 1.996-1.09 3.085-3.103 3.085H5.374Zm.167-2.267h11.91c.65 0 1.001-.317 1.001-1.01V8.973c0-.695-.351-1.011-1.002-1.011H5.541c-.66 0-1.002.316-1.002 1.01v7.814c0 .694.343 1.01 1.002 1.01Zm4.307-6.987c-.326 0-.44-.097-.44-.422V9.87c0-.316.114-.422.44-.422h.518c.317 0 .43.106.43.422v.519c0 .325-.113.421-.43.421h-.518Zm2.795 0c-.326 0-.44-.097-.44-.422V9.87c0-.316.114-.422.44-.422h.518c.316 0 .43.106.43.422v.519c0 .325-.114.421-.43.421h-.518Zm2.794 0c-.325 0-.439-.097-.439-.422V9.87c0-.316.114-.422.44-.422h.51c.325 0 .439.106.439.422v.519c0 .325-.114.421-.44.421h-.51Zm-8.384 2.75c-.325 0-.43-.096-.43-.421v-.519c0-.316.105-.422.43-.422h.518c.325 0 .431.106.431.422v.519c0 .325-.106.421-.43.421h-.52Zm2.795 0c-.326 0-.44-.096-.44-.421v-.519c0-.316.114-.422.44-.422h.518c.317 0 .43.106.43.422v.519c0 .325-.113.421-.43.421h-.518Zm2.795 0c-.326 0-.44-.096-.44-.421v-.519c0-.316.114-.422.44-.422h.518c.316 0 .43.106.43.422v.519c0 .325-.114.421-.43.421h-.518Zm2.794 0c-.325 0-.439-.096-.439-.421v-.519c0-.316.114-.422.44-.422h.51c.325 0 .439.106.439.422v.519c0 .325-.114.421-.44.421h-.51Zm-8.384 2.752c-.325 0-.43-.106-.43-.422v-.519c0-.325.105-.422.43-.422h.518c.325 0 .431.097.431.422v.519c0 .316-.106.421-.43.421h-.52Zm2.795 0c-.326 0-.44-.106-.44-.422v-.519c0-.325.114-.422.44-.422h.518c.317 0 .43.097.43.422v.519c0 .316-.113.421-.43.421h-.518Zm2.795 0c-.326 0-.44-.106-.44-.422v-.519c0-.325.114-.422.44-.422h.518c.316 0 .43.097.43.422v.519c0 .316-.114.421-.43.421h-.518Z"
              ></path></svg
            ><span>Daily Targets</span>
          </div></RouterLink
        >
        <RouterLink class="custom-link" to="/battles"
          ><div
            class="battles"
            :class="{ selected: selectedItem === Selection.Battles }"
            @click="selectedItem = Selection.Battles"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="undefined"
              xmlns="http://www.w3.org/2000/svg"
              style="vertical-align: middle; margin-right: 0px; margin-left: 0px"
            >
              <path
                fill="currentColor"
                d="M6.2,2.44L18.1,14.34L20.22,12.22L21.63,13.63L19.16,16.1L22.34,19.28C22.73,19.67 22.73,20.3 22.34,20.69L21.63,21.4C21.24,21.79 20.61,21.79 20.22,21.4L17,18.23L14.56,20.7L13.15,19.29L15.27,17.17L3.37,5.27V2.44H6.2M15.89,10L20.63,5.26V2.44H17.8L13.06,7.18L15.89,10M10.94,15L8.11,12.13L5.9,14.34L3.78,12.22L2.37,13.63L4.84,16.1L1.66,19.29C1.27,19.68 1.27,20.31 1.66,20.7L2.37,21.41C2.76,21.8 3.39,21.8 3.78,21.41L7,18.23L9.44,20.7L10.85,19.29L8.73,17.17L10.94,15Z"
              ></path></svg
            ><span>Battles</span>
          </div></RouterLink
        >
        <div
          class="leader"
          :class="{ selected: selectedItem === Selection.Leaderboards }"
          @click="selectedItem = Selection.Leaderboards"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="undefined"
            xmlns="http://www.w3.org/2000/svg"
            style="vertical-align: middle; margin-right: 0px; margin-left: 0px"
          >
            <path
              d="M2.3418 5.86914C2.3418 4.77051 3.08008 4.07617 4.23145 4.07617H5.83984C6.09473 3.14453 6.8418 2.6084 7.98438 2.6084H15.0156C16.1582 2.6084 16.9053 3.15332 17.1602 4.07617H18.7686C19.9199 4.07617 20.6582 4.77051 20.6582 5.86914C20.6582 9.34961 18.8477 11.7402 15.2881 12.8564C14.708 13.6123 14.0312 14.2451 13.3457 14.6758V18.0244H14.7256C16.0176 18.0244 16.7822 18.8242 16.7822 20.0811V21.6543C16.7822 22.2432 16.3252 22.6738 15.7627 22.6738H7.2373C6.6748 22.6738 6.21777 22.2432 6.21777 21.6543V20.0811C6.21777 18.8242 6.98242 18.0244 8.27441 18.0244H9.6543V14.6758C8.96875 14.2451 8.29199 13.6123 7.71191 12.8564C4.16113 11.7402 2.3418 9.34961 2.3418 5.86914ZM4.1875 6.2207C4.1875 8.00488 4.91699 9.38477 6.30566 10.2285C5.94531 9.38477 5.7168 8.43555 5.7168 7.44238V5.99219H4.40723C4.27539 5.99219 4.1875 6.08887 4.1875 6.2207ZM16.6943 10.2285C18.083 9.38477 18.8213 8.00488 18.8213 6.2207C18.8213 6.08887 18.7246 5.99219 18.5928 5.99219H17.2832V7.44238C17.2832 8.43555 17.0547 9.38477 16.6943 10.2285Z"
              fill="currentColor"
            ></path></svg
          ><span>Leaderboards</span>
        </div>
        <div
          class="learn"
          :class="{ selected: selectedItem === Selection.Learn }"
          @click="selectedItem = Selection.Learn"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="undefined"
            xmlns="http://www.w3.org/2000/svg"
            style="vertical-align: middle; margin-right: 0px; margin-left: 0px"
          >
            <path
              d="M21.3516 8.46875C21.9609 8.75 22.3047 9.26562 22.3047 9.83594C22.3047 10.4062 21.9609 10.9141 21.3516 11.1953L13.7344 14.6797C12.8906 15.0703 12.1797 15.2422 11.5 15.2344C10.8203 15.2422 10.1172 15.0703 9.26562 14.6797L5.78906 13.0938L10.6328 10.8672C10.9062 10.9531 11.2109 11 11.5156 11C12.4922 11 13.4141 10.5312 13.4141 9.83594C13.4141 9.14844 12.4922 8.69531 11.5156 8.69531C10.5391 8.69531 9.60938 9.15625 9.60938 9.83594C9.60938 9.88281 9.61719 9.92188 9.64062 9.96094L4.375 12.4062L1.65625 11.1953C1.03906 10.9297 0.695312 10.4062 0.695312 9.83594C0.695312 9.26562 1.03906 8.75 1.65625 8.46875L9.26562 4.99219C10.1172 4.60938 10.8203 4.42969 11.5 4.4375C12.1797 4.42969 12.8906 4.60938 13.7344 4.99219L21.3516 8.46875ZM5.77344 14.4766L8.73438 15.8359C9.73438 16.2891 10.6484 16.5156 11.5 16.5078C12.3516 16.5156 13.2734 16.2891 14.2656 15.8359L19.4766 13.4453V15.5625C19.4766 18.1406 16.0703 20.1406 11.5 20.1406C9.21094 20.1406 7.20312 19.6328 5.77344 18.7891V14.4766ZM3.52344 13.4531L4.39844 13.8516V17.6406C3.83594 16.9922 3.52344 16.2422 3.52344 15.5625V13.4531ZM3.60156 20.625C3.60156 20.0391 3.90625 19.6094 4.39844 19.4531V17.6406C4.75 18.0703 5.21094 18.4531 5.77344 18.7891V19.4531C6.26562 19.6094 6.5625 20.0391 6.5625 20.625V22.6094C6.5625 23.3516 6.07031 23.8438 5.32812 23.8438H4.83594C4.09375 23.8438 3.60156 23.3516 3.60156 22.6094V20.625Z"
              fill="currentColor"
            ></path></svg
          ><span>Learn CSS</span>
        </div>
      </div>
      <div class="footer">
        <button>
          <span>Upgrade to</span
          ><img src="https://cssbattle.dev/images/pro-badge.svg" alt="plus icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../styles/mixins.scss';

.custom-link {
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: none;
    color: inherit;
  }
}

.selected {
  border-radius: 32px 0 0 32px;
  box-shadow: inset 1px 1px 2px rgba(255, 255, 255, 0.1);
  @include sidebar-selected;
  @include text-color($dark-text);
}
.sidebar-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100%;
  width: 16rem;
  @include sidebar-bg;
  @include sidebar-text;
  z-index: 6;
  position: fixed;
  top: 0;
  left: 1rem;
  &.lower {
    top: 60px;
    height: calc(100% - 60px);
  }
  .logo-container {
    display: block;
    height: 3.75rem;
    @include bg-color(#fff);
    padding: 1.5rem 2rem;
  }

  .menu-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .menu {
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: end;

      div {
        display: flex;
        padding-left: 1rem;
        flex-flow: row nowrap;
        width: 14rem;
        height: 3rem;
        margin-top: 2px;
        font-size: 1.2rem;
        font-weight: 600;
        gap: 0.4rem;
        align-items: center;
        transition: color 0.2s ease-in-out;
        svg {
          transition: transform 0.3s ease-in-out;
        }
        &:hover:not(.selection-header) {
          @include text-color($dark-text);
          svg {
            transform: translate(-3px, -1px);
          }
        }
      }
      div:not(.home and .selection-header) {
        font-family: ClashGrotesk;
      }
      .selection-header {
        font-size: 1rem;
        @include sidebar-play;
        width: 100%;
        padding-left: 3em;
      }
    }
    .footer {
      margin-top: 1rem;
      width: 100%;
      padding: 1rem 2rem;
      button {
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        width: 100%;
        height: 3rem;
        border: 0;
        border-radius: 40px;
        @include text-color($dark-text);
        @include header-button-bg;
        font-size: larger;
        font-weight: 800;
        cursor: pointer;
        overflow: hidden;
        transition: transform 0.2s ease-in-out;

        &:hover {
          background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
          background-size: 400%;
          z-index: 1;
          animation: glow 8s linear infinite;
          transform: translate(0, -3px);
        }
        @keyframes glow {
          0% {
            background-position: 0%;
          }

          100% {
            background-position: 400%;
          }
        }
      }
      img {
        margin-left: 10px;
      }
    }
  }
}
</style>
