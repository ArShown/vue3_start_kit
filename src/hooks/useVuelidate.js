/**
 * in component
 *
 * import useVuelidate from "@vuelidate/core";
 * ...
 * setup() {
 *   // Get toast interface
 *   const $v = useVuelidate();
 *   ...
 * }
 */
import { VuelidatePlugin } from "@vuelidate/core";

export default { plugin: VuelidatePlugin };
