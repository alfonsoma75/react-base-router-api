import {ADD_TOKEN, NO_TOKEN, REMOVE_TOKEN, TOKEN_VALID} from "types/reducerTypes";

export default function AuthReducer( state, action ) {
    switch ( action.type ) {
        case 'login':
            return {
                ...state,
                isLogged: true
            }

        case TOKEN_VALID:
        case ADD_TOKEN:
            return {
                ...state,
                isLogged: true,
                headers: {
                    'Content-type': 'Application/json',
                    'Authorization': `Bearer  ${action.payload}`
                },
                fileHeaders: {
                    'Authorization': `Bearer  ${action.payload}`
                }
            }

        case REMOVE_TOKEN:
            return {
                ...state,
                isLogged: false,
                headers: {
                    'Content-type': 'Application/json',
                    'Authorization': ''
                },
                fileHeaders: {
                    'Authorization': ''
                }
            }

        case NO_TOKEN:
            return {
                ...state,
                isLogged: false
            }

        default:
            return state
    }
}