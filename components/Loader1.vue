<template>
  <div class="main_loader_wrapper">
    <div class="book">
      <div class="inner">
        <div class="left"></div>
        <div class="middle"></div>
        <div class="right"></div>
      </div>
      <ul>
        <li v-for="n in 18" :key="n"></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({});
</script>

<style scoped>
/* ✅ Tailwind CSS Loader Styling */
.main_loader_wrapper {
  @apply fixed left-0 top-0 w-full h-screen flex items-center justify-center  z-30;
}

/* ✅ Loader Customization */
.main_loader_wrapper.custom_loader {
  @apply relative h-[50vh];
}

/* ✅ Book Animation */
.book {
  --color: var(--main_theme_clr);
  --duration: 6.8s;
  @apply w-8 h-3 relative mt-8;
}

.book .inner {
  @apply w-8 h-3 relative origin-[2px_2px] rotate-[-90deg];
  animation: book var(--duration) ease infinite;
}

.book .inner .left,
.book .inner .right {
  @apply w-[60px] h-[4px] absolute top-0 rounded bg-[var(--color)];
}

.book .inner .left::before,
.book .inner .right::before {
  content: "";
  @apply w-[48px] h-[4px] absolute top-[-10px] left-[6px] rounded;
  background: inherit; /* ✅ Use direct CSS instead */
}


.book .inner .left {
  @apply right-[28px] origin-[58px_2px] rotate-90;
  animation: left var(--duration) ease infinite;
}

.book .inner .right {
  @apply left-[28px] origin-[2px_2px] rotate-[-90deg];
  animation: right var(--duration) ease infinite;
}

.book .inner .middle {
  @apply w-8 h-3 border-[4px] border-[var(--color)] border-t-0 rounded-b-md translate-y-[2px];
}

.book ul {
  @apply m-0 p-0 list-none absolute left-1/2 top-0;
}

/* ✅ Page Flipping Animation */
.book ul li {
  @apply h-[4px] w-[48px] absolute right-0 top-[-10px] rounded bg-[var(--color)];
  transform: rotateZ(0deg) translateX(-18px);
  animation-duration: var(--duration);
  animation-timing-function: ease;
  animation-iteration-count: infinite;
}

.book ul li:nth-child(0) {
  animation-name: page-0;
}
.book ul li:nth-child(1) {
  animation-name: page-1;
}
.book ul li:nth-child(2) {
  animation-name: page-2;
}
.book ul li:nth-child(3) {
  animation-name: page-3;
}
.book ul li:nth-child(4) {
  animation-name: page-4;
}
.book ul li:nth-child(5) {
  animation-name: page-5;
}
.book ul li:nth-child(6) {
  animation-name: page-6;
}
.book ul li:nth-child(7) {
  animation-name: page-7;
}
.book ul li:nth-child(8) {
  animation-name: page-8;
}
.book ul li:nth-child(9) {
  animation-name: page-9;
}
.book ul li:nth-child(10) {
  animation-name: page-10;
}
.book ul li:nth-child(11) {
  animation-name: page-11;
}
.book ul li:nth-child(12) {
  animation-name: page-12;
}
.book ul li:nth-child(13) {
  animation-name: page-13;
}
.book ul li:nth-child(14) {
  animation-name: page-14;
}
.book ul li:nth-child(15) {
  animation-name: page-15;
}
.book ul li:nth-child(16) {
  animation-name: page-16;
}
.book ul li:nth-child(17) {
  animation-name: page-17;
}
.book ul li:nth-child(18) {
  animation-name: page-18;
}

/* ✅ Animations */
@keyframes book {
  4% {
    transform: rotateZ(-90deg);
  }
  10%,
  40% {
    transform: rotateZ(0deg);
    transform-origin: 2px 2px;
  }
  40%,
  60% {
    transform-origin: 30px 2px;
  }
  46%,
  54% {
    transform: rotateZ(90deg);
  }
  60%,
  90% {
    transform: rotateZ(0deg);
    transform-origin: 2px 2px;
  }
  96% {
    transform: rotateZ(-90deg);
  }
}


@keyframes left {
  4% {
    transform: rotateZ(90deg);
  }
  10%,
  40% {
    transform: rotateZ(0deg);
  }
  46%,
  54% {
    transform: rotateZ(90deg);
  }
  60%,
  90% {
    transform: rotateZ(0deg);
  }
  96% {
    transform: rotateZ(90deg);
  }
}

@keyframes right {
  4% {
    transform: rotateZ(-90deg);
  }
  10%,
  40% {
    transform: rotateZ(0deg);
  }
  46%,
  54% {
    transform: rotateZ(-90deg);
  }
  60%,
  90% {
    transform: rotateZ(0deg);
  }
  96% {
    transform: rotateZ(-90deg);
  }
}

/* ✅ Page Flipping Keyframes */
@keyframes page-0 {
  4% {
    transform: rotateZ(0deg) translateX(-18px);
  }
  13%,
  54% {
    transform: rotateZ(180deg) translateX(-18px);
  }
  63% {
    transform: rotateZ(0deg) translateX(-18px);
  }
}
@keyframes page-1 {
  5.86% {
    transform: rotateZ(0deg) translateX(-18px);
  }
  14.74%,
  55.86% {
    transform: rotateZ(180deg) translateX(-18px);
  }
  64.74% {
    transform: rotateZ(0deg) translateX(-18px);
  }
}
@keyframes page-2 {
  7.72% {
    transform: rotateZ(0deg) translateX(-18px);
  }
  16.48%,
  57.72% {
    transform: rotateZ(180deg) translateX(-18px);
  }
  66.48% {
    transform: rotateZ(0deg) translateX(-18px);
  }
}
@keyframes page-3 {
  9.58% {
    transform: rotateZ(0deg) translateX(-18px);
  }
  18.22%,
  59.58% {
    transform: rotateZ(180deg) translateX(-18px);
  }
  68.22% {
    transform: rotateZ(0deg) translateX(-18px);
  }
}
@keyframes page-4 {
  11.44% {
    transform: rotateZ(0deg) translateX(-18px);
  }
  19.96%,
  61.44% {
    transform: rotateZ(180deg) translateX(-18px);
  }
  69.96% {
    transform: rotateZ(0deg) translateX(-18px);
  }
}
</style>
