<template>
  <ul class="typing-text-wrap">
    <li class="typing-text"
        v-for="(item, index) in list"
        :key="index"
        ref="refDOMS">
      <template v-if="refreshList">
        <span v-for="(itemC, indexC) in item"
              :key="indexC"
              v-text="itemC.letter"
              :style="{'--delay': `${itemC.delay}s`}"></span>
      </template>
    </li>
  </ul>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch, nextTick} from "vue";

const props = defineProps({
  text: String
});

let list = ref([]);
let refreshList = ref(true);
const refDOMS = ref([]);

watch(() => props.text, (val) => {
  const texts = val.split(' ');
  let delay = 0;
  list = texts.map((text) => {
    const letters = text.split('');
    return letters.map((letter, letterIdx) => {
      delay += 0.1;
      if (letterIdx === 0) {
        delay += 0.6;
      }
      return {
        letter,
        delay
      }
    })
  })
}, {immediate: true});

let timer = null;

function handleLiAnimate() {
  refDOMS.value.forEach((li, liIdx) => {
    li.addEventListener('animationstart', (e) => {
      if (!li.classList.contains('ing')) {
        li.classList.add('ing');
      }
    });

    li.addEventListener('animationend', (e) => {
      if (e.target === li.querySelector('span:last-child')) {
        li.classList.remove('ing');
        li.classList.add('ended')

        if (liIdx === refDOMS.value.length - 1) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            refDOMS.value.forEach((li) => {
              li.classList.remove('ing');
              li.classList.remove('ended');
            });
            refreshList.value = false;
            nextTick(() => {
              refreshList.value = true;
            })
          }, 3000)
        }
      }
    })
  })
}

onMounted(() => {
  handleLiAnimate();
})
onUnmounted(() => {
  clearTimeout(timer);
})

</script>

<style lang="scss">
.typing-text-wrap {
  .typing-text {
    font-size: 2rem;
    margin: 0;
    padding: 0;
    font-family: monospace;
    position: relative;
    text-align: center;
    line-height: 1.4;
    color: #fff;
  }
  .typing-text::after {
    content: '';
    display: inline-block;
    position: relative;
    width: 6px;
    height: 2rem;
    background-color: #fff;
    border-radius: 2px;
    right: -10px;
    top: -7px;
    visibility: hidden;
  }
  .typing-text.ing::after {
    visibility: visible;
    animation: cursor 0.4s infinite;
  }

  .typing-text.ended::after {
    visibility: hidden;
    animation: cursor 0.4s infinite;
  }

  .typing-text span {
    --delay: 5s;

    display: inline-block;
    overflow: hidden;
    width: 0;
    animation: 0.1s text-in ease-in-out forwards;
    animation-delay: var(--delay);
  }
}

@keyframes cursor {
from {
    opacity: 0;
  }
to {
    opacity: 1;
  }
}

@keyframes text-in {
  from {
    width: 0;
  }
  to {
    width: 2ch;
  }
}
</style>
