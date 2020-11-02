<template>
  <div class="relative h-full overflow-hidden">
    <div class="overflow-x-hidden overflow-y-scroll h-full">
      <Navigation :menu="menu" />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import Navigation from "@/widgets/navigation";
import { LOGOUT } from "@/constants/actions";

export default {
  name: "TheSideBar",
  components: { Navigation },
  setup() {
    const $store = useStore();
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
        path: "/404",
        title: "Error Page",
        icon: "exclamation",
      },
      {
        id: "99",
        title: "Logout",
        icon: "logout",
        event: () => $store.dispatch(LOGOUT),
      },
    ];

    return {
      menu,
    };
  },
};
</script>
