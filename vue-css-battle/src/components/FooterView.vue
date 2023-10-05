<script setup lang="ts">
import { TargetProps } from '@/types/target'
import { computed } from 'vue'

//获取props
const props = withDefaults(defineProps<TargetProps>(), {
  id: ''
})
//判断是否变宽
const isWider = computed(() => {
  return props.id !== ''
})
</script>

<template>
  <div class="footer" :class="{ wider: isWider }">
    <span>© 2023 CSSBattle</span>
    <div class="links">
      <a class="link">Tips & Tricks</a>
      <a class="link">Blog</a>
      <a class="link">FAQs</a>
      <a class="link">Community</a>
      <a class="link">About</a>
      <a class="link">Advertise</a>
      <a class="link">Privacy & Terms</a>
      <a class="link">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="undefined"
          xmlns="http://www.w3.org/2000/svg"
          style="vertical-align: middle; margin-right: 0px; margin-left: 0px"
        >
          <path
            d="M15.0665 3.75452H15.0213L14.7166 4.05615C17.843 4.96104 19.3557 6.37418 19.3557 6.37418C17.3408 5.36674 15.525 4.86301 13.7092 4.65941C12.3971 4.45581 11.085 4.56289 9.9765 4.65941H9.67487C8.96604 4.65941 7.45789 4.96104 5.43697 5.7679C4.73267 6.07406 4.32848 6.27464 4.32848 6.27464C4.32848 6.27464 5.83965 4.76348 9.16964 3.95662L8.96604 3.75302C8.96604 3.75302 6.44441 3.6565 3.72221 5.66836C3.72221 5.66836 1 10.41 1 16.2556C1 16.2556 2.50815 18.8797 6.645 18.9793C6.645 18.9793 7.24826 18.1754 7.85906 17.4681C5.53651 16.7623 4.63162 15.3507 4.63162 15.3507C4.63162 15.3507 4.83371 15.4502 5.13685 15.6523H5.22734C5.27258 15.6523 5.2937 15.6749 5.31783 15.6975V15.7066C5.34196 15.7307 5.36307 15.7518 5.40832 15.7518C5.90601 15.957 6.4037 16.159 6.8109 16.3551C7.51369 16.6597 8.41707 16.9629 9.52556 17.1635C10.9281 17.3671 12.5358 17.4651 14.3667 17.1635C15.2716 16.9599 16.1765 16.7608 17.0814 16.3566C17.6696 16.055 18.3935 15.7534 19.1883 15.2451C19.1883 15.2451 18.2834 16.6567 15.8628 17.3625C16.3605 18.0653 17.0618 18.8707 17.0618 18.8707C21.2001 18.7802 22.8078 16.156 22.8983 16.2676C22.8983 10.4311 20.161 5.68043 20.161 5.68043C17.6952 3.84954 15.3877 3.78016 14.9805 3.78016L15.065 3.75L15.0665 3.75452ZM15.3199 10.41C16.3801 10.41 17.2352 11.3149 17.2352 12.4234C17.2352 13.5394 16.3756 14.4443 15.3199 14.4443C14.2642 14.4443 13.4045 13.5394 13.4045 12.4324C13.4075 11.3164 14.2687 10.4145 15.3199 10.4145V10.41ZM8.46835 10.41C9.52405 10.41 10.3777 11.3149 10.3777 12.4234C10.3777 13.5394 9.51802 14.4443 8.46232 14.4443C7.40661 14.4443 6.54697 13.5394 6.54697 12.4324C6.54697 11.3164 7.40661 10.4145 8.46232 10.4145L8.46835 10.41Z"
            fill="currentColor"
          ></path>
        </svg>
      </a>
      <a class="link">
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
            d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
          ></path>
        </svg>
      </a>
      <a class="link">
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
            d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"
          ></path>
        </svg>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/mixins.scss';
.footer {
  width: calc(100vw - 17rem);
  position: relative;
  left: 17rem;
  bottom: 0;
  @include footer-bg;
  @include text-color($dark-text);
  display: flex;
  gap: 4rem;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.8rem 1.2rem;

  &.wider {
    width: 100vw;
    left: 0;
  }
  span {
    @include footer-left-text;
  }

  .links {
    display: flex;
    width: auto;
    justify-content: flex-end;
    align-items: center;
    .link {
      display: inline-block;
      margin: 0 1.5rem;
      svg {
        transition: transform 0.2s;
      }

      &:hover {
        text-decoration: underline;
      }
      svg:hover {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
