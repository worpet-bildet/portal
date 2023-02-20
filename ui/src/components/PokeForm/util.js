export const getActionStructure = action => {
  const [noun, predicate] = action?.slice().split("_");
  return [predicate, noun];
};
export const withOverrides = (_formData, overrides) => ({
  ..._formData,
  ...overrides,
});

export const getPokeAction = (_actions, noun, predicate) =>
  _actions[noun]?.pokes[predicate?.toLowerCase()];

export const getInitialFormData = () =>
  !skipInit ? {} : { ...initFormData, ...formData };
