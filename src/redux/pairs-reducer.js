export const actionsPairs = {
  addPair: (pair) =>
    ({
      type: "ADD_PAIR",
      pair
    }),
  initPairs: (pairs) =>
    ({
      type: "INIT_PAIRS",
      pairs
    })
};

let initialState = {
  pairs: null,
  isInitialized: false
};
export const pairsReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "ADD_PAIR":
      return { ...state, pairs: [...state.pairs, action.pair] };
    case "INIT_PAIRS":
      return { ...state, pairs: [...action.pairs], isInitialized: true };
    default:
      return { ...state };
  }
};
