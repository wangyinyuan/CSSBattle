<script setup lang="ts">
import Footer from '@/components/FooterView.vue'
import { useCodeStore } from '@/stores/codeStore'
import { TargetProps } from '@/types/target'
import MenuBar from '@/views/Layout/components/MenuBar.vue'
import TopBar from '@/views/Layout/components/TopBar.vue'
import { computed, onBeforeMount, onMounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
//导入codemirror的包
import { users } from '@/data/user'
import { useThemeStore } from '@/stores/themeStore'
import { UserProfile } from '@/types/userProfile'
import { autocompletion } from '@codemirror/autocomplete'
import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { oneDark } from '@codemirror/theme-one-dark'
import { Codemirror } from 'vue-codemirror'

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
//获取当前用户信息
const user = ref<UserProfile>(users[1])

//控制菜单是否可见
const isMenuVisible = ref(false)

//代码编辑
const codeStore = useCodeStore()
const code = ref(codeStore.code)
const placeholder = ref(`Enter your HTML and CSS here...`)
const extensions = [oneDark, html(), css(), autocompletion()]
//监听代码变化,并更新store
watchEffect(() => {
  codeStore.saveCode(code.value)
})
//设置背景颜色
const themeStore = useThemeStore()
const backgroundColor = computed(() => {
  return themeStore.theme === 'dark' ? 'rgb(7, 8, 11)' : 'rgb(246, 249, 251)'
})
//计算字符数
const characters = computed(() => {
  return code.value.length
})

//复选框逻辑
const isSlideAndCompare = ref(false)
const isDiff = ref(false)

//stats框选中情况
const selectedBar = ref(0)
const isYoursSelected = computed(() => {
  return selectedBar.value === 0
})

//预览窗口处理
const imageWidth = ref(400)
const preview = ref<HTMLDivElement | null>(null)
const hover = ref(false)
const imageWidthInt = computed(() => {
  return parseInt(imageWidth.value.toString())
})

const onMouseMove = (e: MouseEvent) => {
  if (preview.value) {
    const left = preview.value.getBoundingClientRect().left
    imageWidth.value = e.clientX - left
  }
}
const onMouseLeave = (e: MouseEvent) => {
  imageWidth.value = 400
}

onBeforeMount(() => {
  getQueryData()
})
onMounted(() => {})
</script>

<template>
  <!--吸顶栏-->
  <TopBar v-bind="myData" @openMenu="isMenuVisible = true" @closeMenu="isMenuVisible = false" />
  <!--菜单栏-->
  <el-dialog v-model="isMenuVisible" :show-close="false" :width="`0%`">
    <MenuBar v-bind="myData" />
  </el-dialog>
  <!--主体内容-->
  <div class="play-body-container">
    <div class="container-editor">
      <div class="editor-header header">
        <span>Editor</span>
        <span class="characters-count">{{ characters }} characters</span>
      </div>
      <codemirror
        v-model="code"
        :placeholder="placeholder"
        :style="{
          maxHeight: '100%',
          overflow: 'auto',
          background: `${backgroundColor} !important`,
          fontSize: '1.3rem',
          fontWeight: 'bold',
          flexGrow: 2
        }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        class="editor"
      />
      <div class="solutions-submit">
        <button class="solutions">
          <svg
            v-if="!user.isPlus"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="undefined"
            xmlns="http://www.w3.org/2000/svg"
            style="vertical-align: middle; margin-right: 0px; margin-left: 0px"
          >
            <path
              d="M12 17a2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5 5 5 0 0 1 5 5v2h1m-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3Z"
              fill="currentColor"
            ></path>
          </svg>
          Top Solutions
        </button>
        <button class="submit">
          <svg
            v-if="!user.isPlus"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="undefined"
            xmlns="http://www.w3.org/2000/svg"
            style="vertical-align: middle; margin-right: 0px; margin-left: 0px"
          >
            <path
              d="M12 17a2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5 5 5 0 0 1 5 5v2h1m-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3Z"
              fill="currentColor"
            ></path>
          </svg>
          Submit
        </button>
      </div>
    </div>
    <div class="container-output">
      <div class="output-header header">
        <span>Code output</span>
        <div class="checkboxes">
          <el-checkbox
            v-model="isSlideAndCompare"
            label="Slide & Compare"
            class="checkbox"
          ></el-checkbox>
          <el-checkbox v-model="isDiff" label="Diff" class="checkbox"></el-checkbox>
        </div>
      </div>
      <div class="output-body">
        <div
          class="output-content"
          @mousemove="onMouseMove"
          @mouseleave="onMouseLeave"
          ref="preview"
        >
          <img class="target-image" alt="" :src="myData?.image" />
          <div class="trans" @mouseover="hover = true" @mouseleave="hover = false"></div>
          <div
            class="preview-div"
            :class="{ hovered: hover }"
            :style="{ width: `${imageWidth}px` }"
          >
            <iframe class="preview-iframe" :srcdoc="code" sandbox="" scrolling="no"></iframe>
          </div>
          <div
            class="preview-distance"
            :style="{ left: `${imageWidth}px` }"
            :class="{ hovered: hover }"
          >
            {{ imageWidthInt }}
          </div>
        </div>
        <div class="radio-tabs">
          <div :class="{ selected: isYoursSelected }" @click="selectedBar = 0">Your stats</div>
          <div :class="{ selected: !isYoursSelected }" @click="selectedBar = 1">Global stats</div>
        </div>
        <div class="stats">
          <div v-if="isYoursSelected" class="your-stats">
            <div class="score-container">
              <div class="icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#ffdf00"
                  color="#ffdf00"
                  xmlns="http://www.w3.org/2000/svg"
                  :style="`color: ${themeStore.theme === 'dark' ? '#ffdf00' : '#976e06'};
                    vertical-align: middle;
                    margin-right: 0px;
                    margin-left: 0px;`"
                >
                  <path
                    d="M6.45312 20.1328C6.01562 19.7969 5.92188 19.2422 6.15625 18.5547L7.71875 13.9219L3.74219 11.0781C3.14062 10.6484 2.875 10.1484 3.05469 9.60938C3.23438 9.09375 3.73438 8.83594 4.46875 8.84375L9.34375 8.88281L10.8281 4.22656C11.0547 3.51562 11.4375 3.11719 12 3.11719C12.5547 3.11719 12.9375 3.51562 13.1641 4.22656L14.6484 8.88281L19.5156 8.84375C20.2578 8.83594 20.7578 9.09375 20.9375 9.61719C21.1172 10.1484 20.8516 10.6484 20.25 11.0781L16.2734 13.9219L17.8359 18.5547C18.0703 19.2422 17.9766 19.7969 17.5391 20.1328C17.0938 20.4766 16.5391 20.3672 15.9297 19.9297L12 17.0312L8.05469 19.9297C7.45312 20.3672 6.89844 20.4766 6.45312 20.1328Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <div class="score">120</div>
              <div>Last score</div>
            </div>
            <div class="score-container">
              <div class="icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#ffdf00"
                  color="#ffdf00"
                  xmlns="http://www.w3.org/2000/svg"
                  :style="`color: ${themeStore.theme === 'dark' ? '#ffdf00' : '#976e06'};
                    vertical-align: middle;
                    margin-right: 0px;
                    margin-left: 0px;`"
                >
                  <path
                    d="M5.6084 13.0278C5.6084 12.812 5.68311 12.6211 5.84912 12.4219L13.9673 2.53564C14.6313 1.73047 15.6606 2.26172 15.2871 3.24951L12.6641 10.189H17.686C18.0845 10.189 18.3833 10.4712 18.3833 10.853C18.3833 11.0688 18.3003 11.2598 18.1426 11.459L10.0161 21.3452C9.35205 22.1504 8.32275 21.6274 8.70459 20.6313L11.3276 13.6919H6.30566C5.89893 13.6919 5.6084 13.4097 5.6084 13.0278Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <div class="score">150</div>
              <div>High score</div>
            </div>
          </div>
          <div v-else class="global-stats">
            <div class="global-group">
              <div class="global-item">
                <div class="icon">
                  <svg
                    width="1.5rem"
                    height="1.5rem"
                    viewBox="0 0 24 24"
                    fill="undefined"
                    xmlns="http://www.w3.org/2000/svg"
                    style="vertical-align: middle; margin-right: 0px; margin-left: 0px"
                  >
                    <path
                      fill="currentColor"
                      d="M12 19.2c-2.5 0-4.71-1.28-6-3.2.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.232 7.232 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10c0-5.53-4.5-10-10-10z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p class="info">Players</p>
                  <p class="value">558</p>
                </div>
              </div>
              <div class="global-item">
                <div class="icon">
                  <svg
                    width="1.5rem"
                    height="1.5rem"
                    viewBox="0 0 24 24"
                    fill="undefined"
                    xmlns="http://www.w3.org/2000/svg"
                    style="vertical-align: middle; margin-right: 0px; margin-left: 0px"
                  >
                    <path
                      d="M8.26367 15.7061V5.18555C8.26367 4.5791 8.65918 4.20117 9.25684 4.20117H11.0234C11.6299 4.20117 12.0166 4.5791 12.0166 5.18555V15.7061C12.0166 16.3037 11.6299 16.6904 11.0234 16.6904H9.25684C8.65918 16.6904 8.26367 16.3037 8.26367 15.7061ZM12.9834 15.7061V7.27734C12.9834 6.67969 13.3613 6.29297 13.9678 6.29297H15.7432C16.3408 6.29297 16.7363 6.67969 16.7363 7.27734V15.7061C16.7363 16.3037 16.3408 16.6904 15.7432 16.6904H13.9678C13.3613 16.6904 12.9834 16.3037 12.9834 15.7061ZM3.54395 15.7061V8.97363C3.54395 8.37598 3.93945 7.98047 4.53711 7.98047H6.30371C6.90137 7.98047 7.29688 8.37598 7.29688 8.97363V15.7061C7.29688 16.3037 6.90137 16.6904 6.30371 16.6904H4.53711C3.93945 16.6904 3.54395 16.3037 3.54395 15.7061ZM17.7031 15.7061V10.6348C17.7031 10.0371 18.0898 9.65039 18.6963 9.65039H20.4629C21.0605 9.65039 21.4561 10.0371 21.4561 10.6348V15.7061C21.4561 16.3037 21.0605 16.6904 20.4629 16.6904H18.6963C18.0898 16.6904 17.7031 16.3037 17.7031 15.7061ZM2.39258 19.1865C2.39258 18.5186 2.90234 18.0527 3.54395 18.0527H21.4561C22.1064 18.0527 22.6074 18.5186 22.6074 19.1865C22.6074 19.8457 22.1064 20.3115 21.4561 20.3115H3.54395C2.90234 20.3115 2.39258 19.8457 2.39258 19.1865Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p class="info">Success rate</p>
                  <p class="value">68.99%</p>
                </div>
              </div>
            </div>
            <div class="global-group">
              <div class="global-item">
                <div class="icon">
                  <svg
                    width="1.5rem"
                    height="1.5rem"
                    viewBox="0 0 24 24"
                    fill="undefined"
                    xmlns="http://www.w3.org/2000/svg"
                    style="vertical-align: middle; margin-right: 0px; margin-left: 0px"
                  >
                    <path
                      d="M6.45312 20.1328C6.01562 19.7969 5.92188 19.2422 6.15625 18.5547L7.71875 13.9219L3.74219 11.0781C3.14062 10.6484 2.875 10.1484 3.05469 9.60938C3.23438 9.09375 3.73438 8.83594 4.46875 8.84375L9.34375 8.88281L10.8281 4.22656C11.0547 3.51562 11.4375 3.11719 12 3.11719C12.5547 3.11719 12.9375 3.51562 13.1641 4.22656L14.6484 8.88281L19.5156 8.84375C20.2578 8.83594 20.7578 9.09375 20.9375 9.61719C21.1172 10.1484 20.8516 10.6484 20.25 11.0781L16.2734 13.9219L17.8359 18.5547C18.0703 19.2422 17.9766 19.7969 17.5391 20.1328C17.0938 20.4766 16.5391 20.3672 15.9297 19.9297L12 17.0312L8.05469 19.9297C7.45312 20.3672 6.89844 20.4766 6.45312 20.1328Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p class="info">Avg. score</p>
                  <p class="value">574.1</p>
                </div>
              </div>
              <div class="global-item">
                <div class="icon">
                  <svg
                    width="1.5rem"
                    height="1.5rem"
                    viewBox="0 0 24 24"
                    fill="undefined"
                    xmlns="http://www.w3.org/2000/svg"
                    style="vertical-align: middle; margin-right: 0px; margin-left: 0px"
                  >
                    <path
                      d="M15.25 19.9688C14.6953 19.9688 14.4062 19.7109 14.4062 19.2578C14.4062 18.7969 14.6953 18.5547 15.25 18.5547H16.7109V4.14062H15.25C14.6953 4.14062 14.4062 3.89062 14.4062 3.42188C14.4062 2.97656 14.6953 2.73438 15.25 2.73438H19.7344C20.2891 2.73438 20.5781 2.97656 20.5781 3.42188C20.5781 3.89062 20.2891 4.14062 19.7344 4.14062H18.3281V18.5547H19.7344C20.2891 18.5547 20.5781 18.7969 20.5781 19.2578C20.5781 19.7109 20.2891 19.9688 19.7344 19.9688H15.25ZM4.64062 17.3594C3.88281 17.3594 3.42188 16.9219 3.42188 16.2109C3.42188 15.9844 3.46094 15.75 3.55469 15.4766L6.67969 6.84375C7.00781 5.89844 7.65625 5.42969 8.66406 5.42969C9.73438 5.42969 10.3828 5.89062 10.7109 6.85156L13.7891 15.3828C13.8828 15.6719 13.9297 15.8984 13.9297 16.1797C13.9297 16.8906 13.4297 17.3594 12.6562 17.3594C11.9453 17.3594 11.5625 17.0469 11.3516 16.2969L10.7266 14.4531H6.57031L5.9375 16.2969C5.73438 17.0469 5.35156 17.3594 4.64062 17.3594ZM7.10156 12.5547H10.2031L8.67969 7.83594H8.625L7.10156 12.5547Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p class="info">Avg. chars</p>
                  <p class="value">547</p>
                </div>
              </div>
            </div>
            <div class="global-item">
              <div class="icon">
                <svg
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 24 24"
                  fill="undefined"
                  xmlns="http://www.w3.org/2000/svg"
                  style="vertical-align: middle; margin-right: 0px; margin-left: 0px"
                >
                  <path
                    d="M7.26025 21.5029C6.41357 21.5029 5.86572 20.9136 5.86572 20.0005V5.39941C5.86572 3.63135 6.84521 2.65186 8.59668 2.65186H15.395C17.1465 2.65186 18.126 3.63135 18.126 5.39941V20.0005C18.126 20.9136 17.5698 21.5029 16.7314 21.5029C16.2002 21.5029 15.8599 21.2705 15.2041 20.6313L12.0664 17.4937C12.0249 17.4604 11.9668 17.4604 11.9253 17.4937L8.7959 20.623C8.14014 21.2705 7.7832 21.5029 7.26025 21.5029ZM8.23145 18.0083L11.2695 15.0698C11.7593 14.5967 12.2324 14.5967 12.7222 15.0698L15.7603 18.0083C15.8682 18.1162 15.9844 18.0747 15.9844 17.9253V5.62354C15.9844 5.04248 15.7271 4.79346 15.1543 4.79346H8.8374C8.26465 4.79346 8.00732 5.04248 8.00732 5.62354V17.9253C8.00732 18.0747 8.13184 18.1162 8.23145 18.0083Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="info">Most used properties</p>
                <p class="value">border-radius, position, top</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-target">
      <div class="target-header header">
        <span>Recreate this target</span>
        <span class="target-size">400px x 300px</span>
      </div>
      <div class="target-body">
        <div class="target-display">
          <img :src="myData?.image" alt="" />
        </div>
        <div class="color-palette">
          <div class="color-header">Colors</div>
          <ul class="color-lists">
            <li>
              #E69041
              <div></div>
            </li>
            <li>
              #221F20
              <div></div>
            </li>
          </ul>
        </div>
        <div class="target-sponsor">
          <div class="sponsor-header">Target Sponsor</div>
          <div class="sponsor-info">
            <a href="https://bytes.dev/?r=cssbattle" target="_blank">
              <img src="https://cssbattle.dev/images/uidev-banner.png" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--脚栏-->
  <Footer v-bind="myData" />
</template>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('../../assets/font/IBMPlexMono-SemiBold.ttf');
}
.play-body-container {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1.3rem;
  @include sidebar-text;
  height: calc(100vh - 53px);
  width: 100vw;
  padding: 60px 1rem 0 1rem;
  display: flex;
  display: relative;
  flex-direction: row;

  .header {
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    justify-content: space-between;
    height: 2rem;
    border: none;
    padding: 0.4rem 1.25rem;
    & > :first-child {
      @include header-number;
      font-weight: 800;
    }
    flex-grow: 0;
  }

  .container-editor {
    min-width: 28rem;
    max-width: 45%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    row-gap: 0;
    .editor-header {
      @include editor-header-bg;
    }
    :deep(.editor) {
      width: 100%;
      overflow: auto;
    }

    .solutions-submit {
      @include editor-submit-border;
      max-height: 8rem;
      flex-grow: 1;
      display: flex;
      padding: 1rem;
      align-items: center;
      justify-content: flex-start;
      gap: 2rem;
      @include editor-footer-bg;

      button {
        max-width: 15rem;
        min-width: 12rem;
        border: 0;
        border-radius: 40px;
        box-shadow: inset 1px 1px 2px hsla(0, 0%, 100%, 0.1);
        cursor: pointer;
        line-height: 1.2;
        transition:
          transform 0.2s ease-in-out,
          background-color 0.2s ease-in-out;
        font-weight: 600;
        letter-spacing: 0.2px;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.6rem, 0.9rem;
      }
      .solutions {
        @include header-button-bg;
        @include text-color($dark-text);
        &:hover {
          transform: translate(0, -3px);
          @include header-button-bg-hover;
        }
        height: 48px;
      }
      .submit {
        background-color: $common-button-bg;
        color: $dark-text;
        &:hover {
          transform: translate(0, -3px);
          background-color: $common-button-bg-hover;
        }
        height: 48px;
        width: 10rem;
        :last-child {
          min-width: 1rem;
        }
      }
    }
  }
  .container-output {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    min-width: 35rem;
    max-width: 25%;
    .output-header {
      @include play-header-bg;
      .checkboxes {
        width: 60%;
        :deep(.checkbox) {
          margin: 0 1rem;
          @include sidebar-text;
          transform: scale(1.2);
        }
      }
    }
    .output-body {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 1.3rem;
      align-items: center;
      overflow-y: auto;
      .output-content {
        min-height: 15rem;
        width: 400px;
        background-color: $dark-text;
        aspect-ratio: 4/3;
        position: relative;
        cursor: col-resize;
        touch-action: none;
        .trans {
          cursor: col-resize;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          z-index: 10;
        }
        .target-image {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .preview-div {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          background-color: white;
          transition: background-color 0.1s ease;
          &.hovered {
            background-color: rgba(255, 255, 255, 0.8);
          }
        }
        .preview-iframe {
          cursor: col-resize;
          width: 100%;
          height: 100%;
          border: none;
        }

        .preview-distance {
          position: absolute;
          top: 100%;
          background: #f22;
          left: 400px;
          transform: translate(-50%, 0px);
          padding: 0.3rem;
          font-weight: 700;
          color: #fff;
          z-index: 1;
          border-radius: 0.3rem;
          opacity: 0;
          &.hovered {
            opacity: 1;
          }
        }
      }
      .radio-tabs {
        width: 100%;
        border-radius: 30px;
        padding: 0.3rem;
        font-size: 1rem;
        @include play-output-radio-bg;
        @include header-number;
        display: flex;
        align-items: center;
        justify-content: space-around;
        div {
          cursor: pointer;
          min-width: 13rem;
          max-width: 14rem;
          padding: 0.5rem 0;
          display: inline-block;
          text-align: center;
          border-radius: 20px;
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
      .stats {
        .your-stats {
          display: flex;
          gap: 2rem;
          justify-content: center;
          .score-container {
            position: relative;
            padding: 0.75rem;
            border-radius: 16px;
            min-width: 14rem;
            max-width: 16rem;
            @include header-text;
            @include play-output-radio-bg;
            display: flex;
            flex-direction: column;
            align-items: center;
            div {
              font-size: 1rem;
            }
            .icon {
              position: absolute;
              top: -1rem;
              height: 2rem;
              width: 2rem;
              z-index: 10;
              @include body-bg;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .score {
              @include text-color($dark-text);
              font-size: 1.5rem;
            }
          }
        }
        .global-stats {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: stretch;
          justify-content: flex-start;

          .global-group {
            display: flex;
            flex-direction: row;
            gap: 1rem;
          }

          .global-item {
            @include play-output-radio-bg;
            @include sidebar-text;
            padding: 0.75rem;
            flex: auto;
            border-radius: 10rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 1rem;

            .icon {
              @include header-button-bg;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              height: 2.5rem;
              width: 2.5rem;
            }
            .value {
              @include target-text-today;
            }
          }
        }
      }
    }
  }

  .container-target {
    flex: 2;
    min-width: 23%;
    max-width: 30%;
    display: flex;
    flex-direction: column;
    gap: 0px;
    .target-header {
      @include play-header-bg;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .target-body {
      padding: 1.25rem;
      .target-display {
        width: 100%;
        img {
          width: auto;
        }
      }
      .color-palette {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        .color-header {
          @include header-number;
          position: relative;
          font-weight: 800;
          font-size: 1.5rem;
          margin-top: 2rem;
          &::after {
            content: '';
            height: 2px;
            width: 70%;
            position: absolute;
            top: 50%;
            margin-top: -2px;
            right: 0;
            z-index: -2;
            @include target-color-divider-bg;
          }
        }
        .color-lists {
          list-style: none;
          display: flex;
          flex-flow: row wrap;
          gap: 0.6rem;
          li {
            display: flex;
            align-items: center;
            width: 9rem;
            height: 2.5rem;
            @include color-text-bg;
            cursor: pointer;
            border-radius: 50px;
            justify-content: flex-end;
            padding: 0.4rem 1rem;
            text-align: right;
            position: relative;
            text-transform: uppercase;
            transition: transform 0.2s ease-in-out;
            &:hover {
              transform: scale(1.05);
              div {
                transform: scale(1.3);
              }
            }
            div {
              position: absolute;
              border-radius: 50px;
              height: 1.5rem;
              width: 1.5rem;
              left: 0.6rem;
              background-color: #e69041;
              transition: transform 0.2s ease-in-out;
            }
          }
        }
      }

      .target-sponsor {
        position: relative;
        .sponsor-header {
          @include header-number;
          position: relative;
          font-weight: 800;
          font-size: 1.5rem;
          margin-top: 2rem;
          &::after {
            content: '';
            height: 2px;
            width: 50%;
            position: absolute;
            top: 50%;
            margin-top: -2px;
            right: 0;
            z-index: -2;
            @include target-color-divider-bg;
          }
        }
        .sponsor-info {
          line-height: 25px;
          width: 100%;
          padding: 2rem;
          img {
            max-width: 100%;
            opacity: 0.8;
            padding: 1.5rem;
            filter: grayscale(100%);
            @include sponsor-img;
            border-radius: 0.5rem;
            transition:
              filter 0.3s ease,
              opacity 0.3s ease;
            &:hover {
              filter: grayscale(0%);
              opacity: 1;
            }
          }
        }
      }
    }
  }
}
</style>
