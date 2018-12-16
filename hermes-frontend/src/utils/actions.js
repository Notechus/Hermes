export const createActionNamespace = namespace => actionType =>
  `${namespace}/${actionType}`;
