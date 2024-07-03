<script setup lang="ts">
import { setAllTargets } from '@/data/targets';
import { ref, onBeforeMount, defineAsyncComponent } from 'vue';
import { RouterView } from 'vue-router';

const isLoading = ref(true);

onBeforeMount(async () => {
  await setAllTargets();
  isLoading.value = false;
});

const AsyncRouterView = defineAsyncComponent({
  loader: () => import('vue-router').then((module) => module.RouterView),
  loadingComponent: {
    template: '<div>Loading...</div>'
  }
});
</script>

<template>
  <Suspense>
    <template #default>
      <AsyncRouterView v-if="!isLoading" />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<style lang="scss" scoped></style>
