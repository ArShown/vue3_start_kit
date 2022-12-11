<template>
  <div
    class="bg-white py-3 flex items-center justify-between border-t border-gray-200"
  >
    <div class="flex-1 flex justify-between items-center sm:hidden">
      <div class="grid gap-1 grid-cols-2">
        <a
          class="relative inline-flex items-center p-2 border border-gray-300 text-sm leading-5 font-medium rounded-md"
          :class="{
            'hover:text-gray-500': !isFirstDisabled,
            'text-gray-700': !isFirstDisabled,
            'bg-white': !isFirstDisabled,
            'cursor-pointer': !isFirstDisabled,
            'text-gray-500': isFirstDisabled,
            'bg-gray-100': isFirstDisabled,
            'cursor-not-allowed': isFirstDisabled,
          }"
          @click.prevent="onFirstClick"
          aria-label="First"
        >
          <i class="h-5 w-5">
            <icons.chevron-double-left />
          </i>
        </a>
        <a
          href="#"
          class="relative inline-flex items-center p-2 border border-gray-300 text-sm leading-5 font-medium rounded-md"
          :class="{
            'hover:text-gray-500': !isFirstDisabled,
            'text-gray-700': !isFirstDisabled,
            'bg-white': !isFirstDisabled,
            'cursor-pointer': !isFirstDisabled,
            'text-gray-500': isFirstDisabled,
            'bg-gray-100': isFirstDisabled,
            'cursor-not-allowed': isFirstDisabled,
          }"
          @click.prevent="onPrevClick"
          aria-label="Previous"
        >
          <i class="h-5 w-5">
            <icons.chevron-left />
          </i>
        </a>
      </div>
      <div>{{ currentPage }} / {{ totalPages }}</div>
      <div class="grid gap-1 grid-cols-2">
        <a
          href="#"
          class="relative inline-flex items-center p-2 border border-gray-300 text-sm leading-5 font-medium rounded-md"
          :class="{
            'hover:text-gray-500': !isLastDisabled,
            'text-gray-700': !isLastDisabled,
            'bg-white': !isLastDisabled,
            'cursor-pointer': !isLastDisabled,
            'text-gray-500': isLastDisabled,
            'bg-gray-100': isLastDisabled,
            'cursor-not-allowed': isLastDisabled,
          }"
          @click.prevent="onNextClick"
          aria-label="Next"
        >
          <i class="h-5 w-5">
            <icons.chevron-right />
          </i>
        </a>
        <a
          href="#"
          class="relative inline-flex items-center p-2 border border-gray-300 text-sm leading-5 font-medium rounded-md"
          :class="{
            'hover:text-gray-500': !isLastDisabled,
            'text-gray-700': !isLastDisabled,
            'bg-white': !isLastDisabled,
            'cursor-pointer': !isLastDisabled,
            'text-gray-500': isLastDisabled,
            'bg-gray-100': isLastDisabled,
            'cursor-not-allowed': isLastDisabled,
          }"
          @click.prevent="onLastClick"
          aria-label="Last"
        >
          <i class="h-5 w-5">
            <icons.chevron-double-right />
          </i>
        </a>
      </div>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-end">
      <div class="pr-2">
        <p class="text-sm leading-5 text-gray-700">
          Showing
          <span class="font-medium">{{ fromIndex }}</span>
          to
          <span class="font-medium">{{ toIndex }}</span>
          of
          <span class="font-medium">{{ totalAmount }}</span>
          results
        </p>
      </div>
      <div>
        <nav class="relative z-0 inline-flex shadow-sm">
          <a
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500"
            aria-label="First"
            :class="{
              'hover:text-gray-500': !isFirstDisabled,
              'text-gray-700': !isFirstDisabled,
              'bg-white': !isFirstDisabled,
              'cursor-pointer': !isFirstDisabled,
              'text-gray-500': isFirstDisabled,
              'bg-gray-100': isFirstDisabled,
              'cursor-not-allowed': isFirstDisabled,
            }"
            @click.prevent="onFirstClick"
          >
            <i class="h-5 w-5">
              <icons.chevron-double-left />
            </i>
          </a>
          <a
            class="-ml-px relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500"
            aria-label="Previous"
            :class="{
              'hover:text-gray-500': !isFirstDisabled,
              'text-gray-700': !isFirstDisabled,
              'bg-white': !isFirstDisabled,
              'cursor-pointer': !isFirstDisabled,
              'text-gray-500': isFirstDisabled,
              'bg-gray-100': isFirstDisabled,
              'cursor-not-allowed': isFirstDisabled,
            }"
            @click.prevent="onPrevClick"
          >
            <i class="h-5 w-5">
              <icons.chevron-left />
            </i>
          </a>
          <a
            v-for="num in pageNums"
            :key="num"
            class="-ml-px cursor-pointer relative inline-flex items-center px-4 py-2 border text-sm leading-5 font-medium"
            :class="{
              'hover:text-gray-500': currentPage !== num,
              'bg-white': currentPage !== num,
              'text-gray-700': currentPage !== num,
              'border-gray-300': currentPage !== num,
              'bg-blue-500': currentPage === num,
              'text-white': currentPage === num,
              'border-blue-500': currentPage === num,
            }"
            @click.prevent="onPageClick(num)"
          >
            {{ num }}
          </a>
          <a
            class="-ml-px relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500"
            :class="{
              'hover:text-gray-500': !isLastDisabled,
              'text-gray-700': !isLastDisabled,
              'bg-white': !isLastDisabled,
              'cursor-pointer': !isLastDisabled,
              'text-gray-500': isLastDisabled,
              'bg-gray-100': isLastDisabled,
              'cursor-not-allowed': isLastDisabled,
            }"
            aria-label="Next"
            @click.prevent="onNextClick"
          >
            <i class="w-5 h-5">
              <icons.chevron-right />
            </i>
          </a>
          <a
            class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500"
            aria-label="Last"
            :class="{
              'hover:text-gray-500': !isLastDisabled,
              'text-gray-700': !isLastDisabled,
              'bg-white': !isLastDisabled,
              'cursor-pointer': !isLastDisabled,
              'text-gray-500': isLastDisabled,
              'bg-gray-100': isLastDisabled,
              'cursor-not-allowed': isLastDisabled,
            }"
            @click.prevent="onLastClick"
          >
            <i class="w-5 h-5">
              <icons.chevron-double-right />
            </i>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { times, inc, add } from "ramda";

export default {
  name: "Pagination",
  props: ["totalAmount", "currentPage", "perPage", "onClick"],
  setup(props) {
    const fromIndex = computed(
      () => (props.currentPage - 1) * props.perPage + 1
    );
    const toIndex = computed(() =>
      Math.min(props.totalAmount, props.currentPage * props.perPage)
    );
    const totalPages = computed(() =>
      Math.ceil(props.totalAmount / props.perPage)
    );
    const isFirstDisabled = computed(() => props.currentPage === 1);
    const isLastDisabled = computed(
      () => props.currentPage === totalPages.value
    );

    const onFirstClick = () => {
      if (isFirstDisabled.value) return false;
      props.onClick(1);
    };
    const onLastClick = () => {
      if (isLastDisabled.value) return false;
      props.onClick(totalPages.value);
    };
    const onPrevClick = () => {
      if (isFirstDisabled.value) return false;
      props.onClick(props.currentPage - 1);
    };
    const onNextClick = () => {
      if (isLastDisabled.value) return false;
      props.onClick(props.currentPage + 1);
    };
    const onPageClick = (page) => {
      props.onClick(page);
    };

    const pageNums = computed(() => {
      if (totalPages.value <= 5) return times(inc, totalPages.value);

      const startNum = Math.max(props.currentPage - 2, 1);
      const endNum = Math.min(props.currentPage + 2, totalPages.value);

      return times(add(startNum), endNum - startNum + 1);
    });

    return {
      fromIndex,
      toIndex,
      totalPages,
      isFirstDisabled,
      isLastDisabled,
      onFirstClick,
      onLastClick,
      onPrevClick,
      onNextClick,
      onPageClick,
      pageNums,
    };
  },
};
</script>
