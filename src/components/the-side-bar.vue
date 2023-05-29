<template>
  <Scrollbar>
    <div class="p-4 flex items-center text-white">
      <div class="h-10 w-10 -ml-1">
        <icons.user-circle />
      </div>
      <div class="ml-3 leading-6 font-semibold">{{ name }}</div>
    </div>
    <div class="h-auto">
      <div class="text-xs px-4 pt-4 text-gray-600">MAIN</div>
      <Navigation :menu="menu" />
    </div>
  </Scrollbar>
</template>

<script>
import { computed } from "vue";
import { useAuthStore } from "@/store/auth/store";
import Scrollbar from "@/widgets/scrollbar";
import Navigation from "@/widgets/navigation";

export default {
  name: "TheSideBar",
  components: { Scrollbar, Navigation },
  setup() {
    const authStore = useAuthStore();
    const name = computed(() => authStore.userInfo.name);
    const menu = [
      {
        id: "1",
        path: "/dashboard",
        title: "Dashboard",
        icon: "dashboard",
      },
      {
        id: "2",
        title: "Nested",
        icon: "menu",
        path: "/nested",
        child: [
          {
            id: "2-1",
            title: "Menu-1",
            path: "/nested/1",
          },
          {
            id: "2-2",
            title: "Menu-2",
            path: "/nested/2",
            child: [
              {
                id: "2-2-1",
                title: "Menu-2-1",
                path: "/nested/2/1",
                child: [
                  {
                    id: "2-2-1-1",
                    title: "Menu-2-1-1",
                    path: "/nested/2/1/1",
                  },
                  {
                    id: "2-2-1-2",
                    title: "Menu-2-1-2",
                    path: "/nested/2/1/2",
                  },
                ],
              },
              {
                id: "2-2-2",
                title: "Menu-2-2",
                path: "/nested/2/2",
              },
            ],
          },
          {
            id: "2-3",
            title: "Menu-3",
            path: "/nested/3",
            child: [
              {
                id: "2-3-1",
                title: "Menu-3-1",
                path: "/nested/3/1",
                child: [
                  {
                    id: "2-3-1-1",
                    title: "Menu-3-1-1",
                    path: "/nested/3/1/1",
                  },
                  {
                    id: "2-3-1-2",
                    title: "Menu-3-1-2",
                    path: "/nested/3/1/2",
                  },
                ],
              },
              {
                id: "2-3-2",
                title: "Menu-3-2",
                path: "/nested/3/2",
              },
            ],
          },
        ],
      },
      {
        id: "3",
        path: "/table",
        title: "Table",
        icon: "table",
      },
      {
        id: "98",
        path: "/404",
        title: "Error Page",
        icon: "exclamation",
      },
      {
        id: "99",
        title: "Logout",
        icon: "logout",
        event: () => authStore.logout(),
      },
    ];

    return {
      name,
      menu,
    };
  },
};
</script>
