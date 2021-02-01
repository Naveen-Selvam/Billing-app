const initialBill = [];

const billReducer = (state = initialBill, action) => {
  switch (action.type) {
    case "POST_BILL": {
      return [...state, action.payload];
    }
 
    default: {
      return [...state];
    }
  }
};

export default billReducer;
