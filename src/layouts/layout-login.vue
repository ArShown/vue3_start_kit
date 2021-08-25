<template>
  <div class="relative bg-gray-800 w-full min-h-full pt-32">
    <div class="relative w-full flex justify-center items-center flex-col">
      <div class="text-white text-5xl pb-4">Vue3 Start-Kit</div>
      <div class="min-w-full sm:w-1/2 sm:min-w-0 lg:w-1/3 p-6">
        <slot></slot>
        <div class="text-white flex flex-row w-full mt-5 text-sm">
          <div class="mr-6">username: admin</div>
          <div>password: any</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
