const initialState = {
  books: [],
  loading: false,
};

const defaultAction = {
  type: 'DEFAULT',
};
const Store = (action = defaultAction, state = initialState) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_ALL_BOOKS':
      return {
        ...state,
        books: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default Store;
