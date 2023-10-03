<script setup lang="ts">
import Footer from '@/components/FooterView.vue'
import { TargetProps } from '@/types/target'
import MenuBar from '@/views/Layout/components/MenuBar.vue'
import TopBar from '@/views/Layout/components/TopBar.vue'
import { onBeforeMount, onMounted, ref, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
//导入codemirror的包
import { Codemirror } from 'vue-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'

enum Selection {
  Home,
  Daily,
  Battles,
  Leaderboards,
  Learn,
  None
}

//接受路由参数
const myData = ref<TargetProps>()
const getQueryData = () => {
  const route = useRoute()
  const router = useRouter()
  myData.value = JSON.parse(route.query.data as string)
  if (!myData.value) {
    router.push({ name: 'not-found' })
  }
}
//控制菜单是否可见
const isMenuVisible = ref(false)

onBeforeMount(() => {
  getQueryData()
})
onMounted(() => {
  console.log(myData.value)
})

//代码编辑
const code = ref(`<h1>Hello, world!</h1><template>
  <codemirror
    v-model="code"
    placeholder="Code goes here..."
   
    :style="{ height: '400px' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    :options="cmOptions"
    @ready="handleReady"
    @change="log('change', $event)"
    @focus="log('focus', $event)"
    @blur="log('blur', $event)"
  />
</template>`)
const extensions = [oneDark]

const view = shallowRef(null)
const handleReady = (editor: any) => {
  view.value = editor.view
}
</script>

<template>
  <!--吸顶栏-->
  <TopBar v-bind="myData" @openMenu="isMenuVisible = true" @closeMenu="isMenuVisible = false" />
  <!--菜单栏-->
  <el-dialog v-model="isMenuVisible" :show-close="false" :width="`0%`">
    <MenuBar v-bind="{ ...myData, selectedItem: Selection.None }" />
  </el-dialog>
  <!--主体内容-->
  <div style="height: 100%; width: auto" class="container">
    <div class="temp"></div>
    <div class="container-editor">
      <codemirror
        v-model="code"
        placeholder="Code goes here..."
        :style="{ height: '400px' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        @ready="handleReady"
        @change="console.log('change', $event)"
        @focus="console.log('focus', $event)"
        @blur="console.log('blur', $event)"
      />
    </div>
    <div class="container-output"></div>
    <div class="container-target"></div>
  </div>
  <!--脚栏-->
  <Footer v-bind="myData" />
</template>

<style lang="scss" scoped>
div {
  color: white;
}
.temp {
  height: 100px;
  width: 100%;
  background-color: #000;
}
</style>
