export const removeLocal = async () => {
  await localStorage.clear();
};

export const setUser = async (user) => {
  await localStorage.setItem('userInfo', JSON.stringify(user));
};

export const getUser = async () => {
  const user = await localStorage.getItem('userInfo');
  return user ? JSON.parse(user) : '';
};
