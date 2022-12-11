//@ts-nocheck
import { keys, forEach, reduce, isNil, isEmpty, assoc } from "ramda";

const _computedRejectData = (payload: any, { rejectNil, rejectEmpty }: any) =>
  reduce(
    (result, key: any) => {
      const value = payload[key];
      if (rejectNil && isNil(value)) return result;
      if (rejectEmpty && isEmpty(value)) return result;
      return assoc(key, value, result);
    },
    {},
    keys(payload)
  );

export default {
  install: (register) => {
    register.request.use((config: any) => {
      const {
        isFormData = false,
        rejectNil = true,
        rejectEmpty = true,
      } = config;

      if (config.params) {
        config.params = _computedRejectData(config.params, {
          rejectNil,
          rejectEmpty,
        });
      }

      if (config.data) {
        config.data = _computedRejectData(config.data, {
          rejectNil,
          rejectEmpty,
        });

        if (isFormData) {
          const formData = new FormData();
          const data: object = config.data;
          forEach((key: string) => {
            if (config.data[key] instanceof Array) {
              forEach((value: any) => {
                formData.append(`${key}[]`, value);
              }, config.data[key]);
            } else {
              formData.append(key, config.data[key]);
            }
          }, keys(data));
          config.data = formData;
          config.headers.ContentType = "multipart/form-data";
        }
      }

      return config;
    });
    register.response.use((response) => {
      return response.data;
    });
  },
};
