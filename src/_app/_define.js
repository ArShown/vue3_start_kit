import { startsWith, memoizeWith, identity } from "ramda";

export const defineProvider = (instance) => {
  const useProvider = memoizeWith(identity, () => {
    if (typeof instance === "function") {
      instance = instance();
    }
    return instance;
  });

  return useProvider;
};

export const defineService = (id, instance) => {
  const useService = memoizeWith(identity, () => {
    if (typeof instance === "function") {
      instance = instance();
    }

    const CONSTANT_SIGNAL = "$";

    const messages = {
      isNotExist: (propKey) =>
        `[Service Error (${id}) ]: propKey '${propKey}' is not defined.`,
      isConstant: (propKey) =>
        `[Service Error (${id}) ]: propKey '${propKey}' is not writeable.`,
    };

    const proxy = new Proxy(instance, {
      set(target, propKey, value, receiver) {
        switch (true) {
          case !Reflect.has(target, propKey):
            throw Error(messages.isNotExist(propKey));
          case startsWith(CONSTANT_SIGNAL, propKey):
            throw Error(messages.isConstant(propKey));
        }
        return Reflect.set(target, propKey, value, receiver);
      },

      get(target, propKey, receiver) {
        switch (true) {
          case !Reflect.has(target, propKey):
            throw Error(messages.isNotExist(propKey));
        }
        return Reflect.get(target, propKey, receiver);
      },

      deleteProperty(target, propKey) {
        switch (true) {
          case !Reflect.has(target, propKey):
            throw Error(messages.isNotExist(propKey));
          case startsWith(CONSTANT_SIGNAL, propKey):
            throw Error(messages.isConstant(propKey));
        }
        Reflect.deleteProperty(target, propKey);
        return true;
      },
    });

    return proxy;
  });

  return useService;
};
