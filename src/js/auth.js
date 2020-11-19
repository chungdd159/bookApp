export const getDataLocal = async () => {
  const state = await localStorage.getItem('state');
  return state ? JSON.parse(state) : {};
};

export const setDataLocal = async (val) => {
  await localStorage.setItem('state', JSON.stringify(val));
};

export const removeLocal = async () => {
  await localStorage.clear();
};
