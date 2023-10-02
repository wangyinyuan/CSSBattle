<script setup lang="ts">
import { scrollbarList } from '@/data/scrollBar'

const scrollBarList = scrollbarList
</script>

<template>
  <div class="scroller">
    <div class="scroller-inner">
      <template v-for="item in scrollBarList" :key="item.id">
        <div v-if="!item.isOwn" class="scroller-item">
          <img :src="item.image" /><a>{{ item.name }}</a
          >set a new record on<a>{{ item.target }}</a
          >with 212 chars(-1).<span>{{ item.time }}</span>
        </div>
        <div v-else class="scroller-item">
          <img :src="item.image" /><a>{{ item.name }}</a
          >broke own record on<a>{{ item.target }}</a
          >with 212 chars(-1).<span> {{ item.time }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../../styles/mixins.scss';
.scroller {
  max-width: 100%;
  overflow: hidden;
  -webkit-mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
  mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
  .scroller-inner {
    padding-block: 1rem;
    width: max-content;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    animation: scroll 30s forwards linear infinite;

    @keyframes scroll {
      to {
        transform: translate(calc(-50% - 0.5rem));
      }
    }
    .scroller-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 0.5rem;
      white-space: nowrap;
      padding: 0.5rem 1rem 0.5rem 0.5rem;
      width: auto;
      height: auto;
      justify-content: flex-start;
      font-size: 1.2rem;
      @include target-text;
      font-weight: 600;
      a {
        @include text-color($dark-text);
        &:hover {
          text-decoration: underline;
        }
      }
      span {
        @include header-text;
      }
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }
    }
  }
}
</style>
