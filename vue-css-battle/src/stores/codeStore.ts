import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCodeStore = defineStore('code', () => {
  const code = ref('')

  code.value =
    localStorage.getItem('user-code') ||
    `<!-- Write HTML between the <div> tags below -->
<div>
  
</div>
<!-- Write CSS between the <style> tags below -->
<style>
  div {
    width: 100px;
    height: 100px;
    background: #dd6b4d;
  }
</style>
    
<!-- OBJECTIVE -->
<!-- Write HTML/CSS in this editor and replicate the given
target image in the least code possible. What you write here, renders
as it is -->
    
<!-- SCORING -->
<!-- The score is calculated based on the number of characters
you use (this comment included :P) and how close you replicate 
the image. Read the FAQS (https://cssbattle.dev/faqs) for more 
info. -->
    
<!-- IMPORTANT: remove the comments before submitting -->`

  function saveCode(code: string): void {
    localStorage.setItem('user-code', code)
  }

  return { code, saveCode }
})
