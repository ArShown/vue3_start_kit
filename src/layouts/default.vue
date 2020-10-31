<template>
  <div class="relative w-full h-full">
    <div
      class="fixed inset-0 right-auto h-full w-56 bg-gray-800 overflow-hidden z-50"
    >
      <TheSideBar />
    </div>
    <div class="relative min-h-full ml-56">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>
