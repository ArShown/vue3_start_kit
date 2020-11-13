<template>
  <div>
    <h1 class="text-4xl mb-3">Table</h1>
    <table class="table-fixed w-full">
      <thead>
        <tr>
          <th class="border w-12 px-4 py-2">#</th>
          <th class="border text-left px-4 py-2">Title</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(post, idx) in posts.data"
          :key="post.id"
          :class="{
            'bg-gray-100': idx % 2 > 0,
          }"
        >
          <td class="border px-4 py-2 text-center">
            {{ idx + 1 + (posts.currentPage - 1) * posts.perPage }}
          </td>
          <td class="border px-4 py-2">
            {{ post.title }}
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :totalAmount="posts.totalAmount"
      :currentPage="posts.currentPage"
      :perPage="posts.perPage"
      :onClick="onClick"
    />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { GET_POSTS } from "@/constants/actions";
import Pagination from "@/widgets/pagination";

export default {
  name: "Table",
  components: { Pagination },
  breadcrumb: [
    {
      path: "/table",
      title: "Table",
    },
  ],
  setup() {
    const $store = useStore();
    const posts = computed(() => $store.state.posts);

    onMounted(() => {
      $store.dispatch(GET_POSTS, 1);
    });

    const onClick = (page) => {
      $store.dispatch(GET_POSTS, page);
    };
    return { posts, onClick };
  },
};
</script>
