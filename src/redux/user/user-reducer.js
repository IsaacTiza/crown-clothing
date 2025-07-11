import { userActionTypes } from "./user-action.types";

const INITIAL_STATE = {
	currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case userActionTypes.SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload,
			};
		default:
			return state; // ✅ THIS FIXES THE ERROR
	}
};

export default userReducer;
