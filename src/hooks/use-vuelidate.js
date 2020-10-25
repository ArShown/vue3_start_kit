/**
 * in component
 *
 * import useVuelidate, { required } from "@/hooks/use-vuelidate";
 * ...
 * setup() {
 *   // state data
 *   const form = reactive({ acc: "", pw: "" });
 *   // Validation Logics
 *   const rules = {
 *     acc: { required },
 *     pw: { required },
 *   };
 *   const $v = useVuelidate(rules, form);
 *   ...
 * }
 */
import useVuelidate, { VuelidatePlugin } from "@vuelidate/core";
export * from "@vuelidate/validators";

export const install = { plugin: VuelidatePlugin };

export default useVuelidate;
