export default (state, action) => {
    switch (action.type) {
        case "GET_USER":
            console.log(action);
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                token: action.payload.token
                //   transactions: action.payload
            };
        case "TRANSACTION_ERROR":
            console.log(action.payload);
            break;
        default:
            return state;
    }
};
