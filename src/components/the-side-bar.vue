<template>
  <div class="relative h-full overflow-hidden">
    <div class="overflow-x-hidden overflow-y-scroll h-full">
      <Navigation :menu="menu" />
    </div>
  </div>
</template>

<script>
import Navigation from "@/widgets/navigation";

export default {
  name: "TheSideBar",
  components: { Navigation },
  setup() {
    const menu = [
      {
        id: "1",
        path: "/home",
        title: "Dashboard",
        icon: "dashboard",
      },
      {
        id: "2",
        title: "Nested",
        icon: "menu",
        child: [
          {
            id: "2-1",
            title: "Menu-1",
          },
          {
            id: "2-2",
            title: "Menu-2",
            child: [
              {
                id: "2-2-1",
                title: "Menu-2-1",
                child: [
                  {
                    id: "2-2-1-1",
                    title: "Menu-2-1-1",
                  },
                  {
                    id: "2-2-1-2",
                    title: "Menu-2-1-2",
                  },
                ],
              },
              {
                id: "2-2-2",
                title: "Menu-2-2",
              },
            ],
          },
          {
            id: "2-3",
            title: "Menu-3",
            child: [
              {
                id: "2-3-1",
                title: "Menu-3-1",
                child: [
                  {
                    id: "2-3-1-1",
                    title: "Menu-3-1-1",
                  },
                  {
                    id: "2-3-1-2",
                    title: "Menu-3-1-2",
                  },
                ],
              },
              {
                id: "2-3-2",
                title: "Menu-3-2",
              },
            ],
          },
        ],
      },
      {
        id: "3",
        path: "/route",
        title: "Route",
        icon: "location-marker",
      },
      {
        id: "4",
        path: "/404",
        title: "Error Page",
        icon: "exclamation",
      },
    ];

    return {
      menu,
    };
  },
};
</script>
