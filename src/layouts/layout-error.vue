<template>
  <div
    class="relative w-full h-full pt-32 bg-blue-200 flex items-center flex-col"
  >
    <div class="error_title">
      <span>4</span>
      <span class="w-32 h-32 animate-spin error_title__icon">
        <QuestionIcon />
      </span>
      <span>4</span>
    </div>
    <router-link
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      :to="{ name: 'default-path' }"
      >Back To Home</router-link
    >
  </div>
</template>

<script>
import QuestionIcon from "@/widgets/icons/question-circle";

export default {
  components: { QuestionIcon },
};
</script>

<style scoped>
.error_title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8rem;
  color: #ffffff;
}
.error_title__icon {
  animation-duration: 2s;
}
</style>
