import { LOGIN_USER } from '../actions'

const initialState = {
    value: localStorage.getItem('AuthToken') === null ? false : true,
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                value: action.payload,
            }
        default:
            return state
    }
}

export default loginReducer