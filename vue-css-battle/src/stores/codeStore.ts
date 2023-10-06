import { defineStore } from 'pinia'

const DEFAULT_CODE_TEMPLATE = `<!-- Write HTML between the <div> tags below -->
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

export const useCodeStore = defineStore('code', () => {
  // Helper function to generate a local storage key for a given targetId
  function getStorageKey(targetId: string): string {
    return `user-code-${targetId}`
  }

  function loadCode(targetId: string): string {
    return localStorage.getItem(getStorageKey(targetId)) || DEFAULT_CODE_TEMPLATE
  }

  function saveCode(targetId: string, code: string): void {
    localStorage.setItem(getStorageKey(targetId), code)
  }

  return { saveCode, loadCode }
})
