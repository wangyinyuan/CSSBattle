<script setup lang="ts"></script>

<template>
  <div class="container">
    <header class="v2-header">
      <div class="left-header"></div>
      <div class="right-header">
        <div class="header-live-counter">
          <div class="blink"></div>
          <span class="online-number">200</span>
          Online
        </div>
        <button class="switch-theme button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="undefined"
            style="color: undefined; vertical-align: middle; margin-right: 0; margin-left: 0"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9999 2.40002C12.3182 2.40002 12.6234 2.52645 12.8484 2.7515C13.0735 2.97654 13.1999 3.28176 13.1999 3.60002V4.80002C13.1999 5.11828 13.0735 5.42351 12.8484 5.64855C12.6234 5.8736 12.3182 6.00002 11.9999 6.00002C11.6816 6.00002 11.3764 5.8736 11.1514 5.64855C10.9263 5.42351 10.7999 5.11828 10.7999 4.80002V3.60002C10.7999 3.28176 10.9263 2.97654 11.1514 2.7515C11.3764 2.52645 11.6816 2.40002 11.9999 2.40002ZM16.7999 12C16.7999 13.2731 16.2942 14.494 15.394 15.3941C14.4938 16.2943 13.2729 16.8 11.9999 16.8C10.7269 16.8 9.50596 16.2943 8.60579 15.3941C7.70562 14.494 7.1999 13.2731 7.1999 12C7.1999 10.727 7.70562 9.50609 8.60579 8.60591C9.50596 7.70574 10.7269 7.20002 11.9999 7.20002C13.2729 7.20002 14.4938 7.70574 15.394 8.60591C16.2942 9.50609 16.7999 10.727 16.7999 12ZM16.2431 17.94L17.0915 18.7884C17.3178 19.007 17.6209 19.128 17.9356 19.1252C18.2502 19.1225 18.5512 18.9963 18.7737 18.7738C18.9962 18.5513 19.1224 18.2503 19.1251 17.9357C19.1278 17.6211 19.0069 17.3179 18.7883 17.0916L17.9399 16.2432C17.7136 16.0246 17.4105 15.9037 17.0958 15.9064C16.7812 15.9092 16.4802 16.0354 16.2577 16.2578C16.0352 16.4803 15.909 16.7813 15.9063 17.0959C15.9036 17.4106 16.0245 17.7137 16.2431 17.94ZM18.7871 5.21162C19.0121 5.43666 19.1384 5.74183 19.1384 6.06002C19.1384 6.37822 19.0121 6.68339 18.7871 6.90842L17.9399 7.75682C17.8292 7.87144 17.6968 7.96286 17.5504 8.02575C17.404 8.08864 17.2465 8.12174 17.0872 8.12313C16.9278 8.12451 16.7698 8.09415 16.6224 8.03381C16.4749 7.97347 16.3409 7.88437 16.2282 7.7717C16.1156 7.65903 16.0265 7.52505 15.9661 7.37757C15.9058 7.23009 15.8754 7.07208 15.8768 6.91274C15.8782 6.75341 15.9113 6.59594 15.9742 6.44954C16.0371 6.30313 16.1285 6.17072 16.2431 6.06002L17.0915 5.21162C17.3165 4.98666 17.6217 4.86028 17.9399 4.86028C18.2581 4.86028 18.5621 4.98666 18.7871 5.21162ZM20.3999 13.2C20.7182 13.2 21.0234 13.0736 21.2484 12.8486C21.4735 12.6235 21.5999 12.3183 21.5999 12C21.5999 11.6818 21.4735 11.3765 21.2484 11.1515C21.0234 10.9265 20.7182 10.8 20.3999 10.8H19.1999C18.8816 10.8 18.5764 10.9265 18.3514 11.1515C18.1263 11.3765 17.9999 11.6818 17.9999 12C17.9999 12.3183 18.1263 12.6235 18.3514 12.8486C18.5764 13.0736 18.8816 13.2 19.1999 13.2H20.3999ZM11.9999 18C12.3182 18 12.6234 18.1265 12.8484 18.3515C13.0735 18.5765 13.1999 18.8818 13.1999 19.2V20.4C13.1999 20.7183 13.0735 21.0235 12.8484 21.2486C12.6234 21.4736 12.3182 21.6 11.9999 21.6C11.6816 21.6 11.3764 21.4736 11.1514 21.2486C10.9263 21.0235 10.7999 20.7183 10.7999 20.4V19.2C10.7999 18.8818 10.9263 18.5765 11.1514 18.3515C11.3764 18.1265 11.6816 18 11.9999 18ZM6.0599 7.75682C6.17132 7.86832 6.3036 7.95677 6.4492 8.01714C6.5948 8.07751 6.75086 8.10861 6.90848 8.10867C7.0661 8.10872 7.22218 8.07773 7.36782 8.01747C7.51347 7.9572 7.64581 7.86884 7.7573 7.75742C7.86879 7.64601 7.95725 7.51373 8.01762 7.36813C8.07799 7.22253 8.10909 7.06647 8.10915 6.90885C8.1092 6.75123 8.07821 6.59514 8.01795 6.4495C7.95768 6.30386 7.86932 6.17152 7.7579 6.06002L6.9083 5.21162C6.68198 4.99303 6.37886 4.87208 6.06422 4.87482C5.74958 4.87755 5.44861 5.00375 5.22612 5.22624C5.00363 5.44873 4.87743 5.74971 4.87469 6.06434C4.87196 6.37898 4.99291 6.6821 5.2115 6.90842L6.0599 7.75682ZM7.7567 17.94L6.9083 18.7884C6.68198 19.007 6.37886 19.128 6.06422 19.1252C5.74958 19.1225 5.44861 18.9963 5.22612 18.7738C5.00363 18.5513 4.87743 18.2503 4.87469 17.9357C4.87196 17.6211 4.99291 17.3179 5.2115 17.0916L6.0599 16.2432C6.28623 16.0246 6.58935 15.9037 6.90398 15.9064C7.21862 15.9092 7.51959 16.0354 7.74208 16.2578C7.96457 16.4803 8.09078 16.7813 8.09351 17.0959C8.09625 17.4106 7.97529 17.7137 7.7567 17.94ZM4.7999 13.2C5.11816 13.2 5.42339 13.0736 5.64843 12.8486C5.87347 12.6235 5.9999 12.3183 5.9999 12C5.9999 11.6818 5.87347 11.3765 5.64843 11.1515C5.42339 10.9265 5.11816 10.8 4.7999 10.8H3.5999C3.28164 10.8 2.97642 10.9265 2.75137 11.1515C2.52633 11.3765 2.3999 11.6818 2.3999 12C2.3999 12.3183 2.52633 12.6235 2.75137 12.8486C2.97642 13.0736 3.28164 13.2 3.5999 13.2H4.7999Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <!-- 未登录展示登录，已登录展示头像 -->
        <button class="login button">Sign In / Sign Up</button>
      </div>
    </header>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../styles/mixins.scss';
.container {
  .v2-header {
    height: 60px;
    width: 100%;
    [data-theme='dark'] & {
      background: linear-gradient(90deg, $dark-background 50%, transparent);
    }
    [data-theme='light'] & {
      background: linear-gradient(90deg, $light-background 50%, transparent);
    }
    position: fixed;
    top: 0;
    right: 0;
    left: 17rem;
    backdrop-filter: blur(20px);
    padding: 0.7rem calc(18rem) 0.7rem 1rem;
    display: flex;
    justify-content: space-between;
    z-index: 10;

    > div {
      width: 100%;
      display: flex;
    }
    .right-header {
      justify-content: end;
      align-items: center;
      > * {
        margin: 0 0.5rem;
      }
      .button {
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
        text-align: left;
        &:hover {
          transform: translate(0, -3px);
          @include header-button-bg-hover;
        }
      }
      .login {
        height: 48px;
      }
      .switch-theme {
        width: 2.5rem;
        height: 2.5rem;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .header-live-counter {
        display: flex;
        gap: 0.25rem;
        align-items: center;
        font-weight: 600;
        font-size: 1.2rem;
        @include header-text;
        .blink {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 100%;
          @include header-blink;
          position: relative;
          margin-right: 0.5rem;
          animation: blink 2s infinite ease-in-out;
        }

        @keyframes blink {
          0% {
            box-shadow: 0 0 0 0 rgba(158, 139, 15, 0.4);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 0 0.4rem rgba(158, 139, 15, 0.4);
            transform: scale(1.3);
          }
          65% {
            box-shadow: 0 0 0 0.4rem rgba(223, 196, 18, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(223, 196, 18, 0);
          }
        }
        .online-number {
          margin: 0 0.25rem;
          @include header-number;
        }
      }
    }
  }
}
</style>