<template>
  <div class="hello">
    <h1 class="text-4xl text-red-700">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>
