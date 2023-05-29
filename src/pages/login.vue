<template>
  <form novalidate>
    <div class="pb-5 relative">
      <input
        type="text"
        class="relative z-10 w-full leading-8 px-2 py-1 outline-none rounded border-2 border-white"
        :class="{ 'border-red-500': isAccountInvalid }"
        v-model="form.account"
        autocomplete="off"
        placeholder="username"
      />
      <span
        :class="{
          '-translate-y-5': !isAccountInvalid,
        }"
        class="absolute left-0 bottom-0 text-red-500 text-xs transform transition-transform duration-300 ease-in-out"
        >{{ accountErrorMessage }}</span
      >
    </div>
    <div class="pb-5 pt-1 relative">
      <input
        type="password"
        class="relative z-10 w-full leading-8 px-2 py-1 outline-none rounded border-2 border-white"
        :class="{ 'border-red-500': isPasswordInvalid }"
        v-model="form.password"
        autocomplete="off"
        placeholder="password"
      />
      <span
        :class="{
          '-translate-y-5': !isPasswordInvalid,
        }"
        class="absolute left-0 bottom-0 text-red-500 text-xs transform transition-transform duration-300 ease-in-out"
        >密碼為必填</span
      >
    </div>
    <div class="pt-1">
      <button
        class="w-full text-white bg-blue-500 p-2 rounded hover:bg-blue-800"
        @click.prevent="loginHandler"
      >
        登 入
      </button>
    </div>
  </form>
</template>

<script>
import { reactive, computed } from "vue";
import { useAuthStore } from "@/store/auth/store";
import { useVuelidate, required } from "@/hooks/use-vuelidate";

export default {
  needAuth: false,
  layout: "layout-login",
  name: "Login",
  setup() {
    const form = reactive({ account: "admin", password: "anything" });
    const rules = {
      account: {
        required,
        /* custom condition */
        equals(value) {
          return value === "admin";
        },
      },
      password: { required },
    };
    const authStore = useAuthStore();
    const $v = useVuelidate(rules, form);

    // computed state
    const isAccountInvalid = computed(() => $v.value.account.$invalid);
    const accountErrorMessage = computed(() => {
      if (!isAccountInvalid.value) return "請輸入正確帳號";
      const errorMessage = {
        required: "帳號為必填",
        equals: "請輸入正確帳號",
      };
      const firstErrorType = $v.value.account.$errors[0].$validator;
      return errorMessage[firstErrorType] || "帳號為必填";
    });
    const isPasswordInvalid = computed(() => $v.value.password.$invalid);

    // methods
    const loginHandler = () => {
      $v.value.$touch();
      if ($v.value.$invalid) return false;
      authStore.login();
    };

    return {
      form,
      isAccountInvalid,
      accountErrorMessage,
      isPasswordInvalid,
      loginHandler,
    };
  },
};
</script>
