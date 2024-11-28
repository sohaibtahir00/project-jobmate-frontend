export const formatToCreatableSelect = (options = []) =>
  options.map((item) => ({ value: item, label: item }));

export const processOptions = (options) =>
  options
    .flatMap((option) =>
      Array.isArray(option.value)
        ? option.value.map((v) => v.toString().toLowerCase())
        : [option.value?.toString().toLowerCase()]
    )
    .filter(Boolean);
