<template>
  <div>album</div>
  {{ id }}
</template>

<script>
export default {
  computed: {
    id() {
      return this.$route.params.aid;
    },
  },
};
</script>
