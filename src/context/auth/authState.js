import { useReducer } from 'react';

// Context
import AuthContext from './authContext';

// Reducers
import AuthReducer from './authReducer';

// Api Services
import postFetch from "services/postFetch";

// Constants
import {API_CHECK_TOKEN, API_LOGIN, API_REFRESH_TOKEN} from "types/apiTypes";
import {
    ACCESS,
    ADD_TOKEN, NO_TOKEN, REFRESH,
    REMOVE_TOKEN, TOKEN_VALID
} from "types/reducerTypes";


export default function AuthState({ children }) {

    const initialData = {
        isLogged: null,
        headers: {
            'Content-type': 'Application/json',
            'Authorization': ''
        },
        fileHeaders: {
            'Authorization': ''
        },
        errors: {
            error: false,
        }
    }

    const [ state, dispatch ] = useReducer(AuthReducer, initialData)

    const verifyToken = async (token) => {
        const tokenData = await postFetch(API_CHECK_TOKEN, {token: token}, state.headers)
        return !tokenData.detail;
    }

    const refreshToken = async refresh => {
        const refreshData = await postFetch(API_REFRESH_TOKEN, {refresh: refresh}, state.headers)
        if (!!refreshData.access) {
            // Agregar token a headers,
            // isLogged: true
            // update datastore de token y refresh
            dispatch({
                type: ADD_TOKEN,
                payload: refreshData.access
            })
            // Guardar en localStorage el token y el refresh
            localStorage.setItem(ACCESS, refreshData.access)

        }else {
            // Si el refresh no es OK
            // Eliminar datastore
            // isLogged: false
            dispatch({
                type: NO_TOKEN
            })
            localStorage.removeItem(ACCESS)
            localStorage.removeItem(REFRESH)
        }
    }

    const checkToken = async () => {
        // Recuperar tokoen desde localStorage
        const token = localStorage.getItem(ACCESS)

        if (!!token) {
            // si existe:
            // Comprobar si el token es válido
            const isValid = await verifyToken(token)
            if (isValid) {
                // Si es válido:
                // Agregar token a headers,
                // isLogged: true
                dispatch({
                    type: TOKEN_VALID,
                    payload: token
                })
            }else {

                // Si no es válido, intentar un refresh.
                // Si el refresh es OK
                const refresh = localStorage.getItem(REFRESH)
                if (!!refresh) {
                    // Intentar un refresh del token
                    await refreshToken(refresh)

                }else {
                    // Si no existe refresh
                    dispatch({
                        type: NO_TOKEN
                    })
                }

            }

        }else {
            // Si no existe el token
            dispatch({
                type: NO_TOKEN
            })

        }

    }


    /**
     * Hace el post para el Login.
     *   Si el login es correcto hace un dispatch del token y guarda el token y refress en datastore
     *   Redirige a la página de inicio activando el estado isLogged
     *
     *   Si el login devuelve errores, hace el dispatch a errors para su gestión en el formulario
     *
     * @param values (JSON): Valores que envía el formulario
     *
     */
    const doLogin = async (values) => {
        const data = await postFetch(API_LOGIN, values, state.headers)
        if (data.access) {
            // Cambiar headers
            dispatch({
                type: ADD_TOKEN,
                payload: data.access
            })
            // Guardar en localStorage el token y el refresh
            localStorage.setItem(ACCESS, data.access)
            localStorage.setItem(REFRESH, data.refresh)

        }else if (data.detail) {
            console.log('Error', data.detail)
            // state de gestion de errores
        }else {
            console.log('Otro error')
        }

    }

    /**
     * Realiza el Logout.
     *   Limpia el token de los headers y vacia el datastore.
     *   Redirige al inicio con el stado isLogged false. (que llevará a la página de login)
     */
    const doLogout = () => {
        dispatch({
            type: REMOVE_TOKEN
        })

        // Vaciar LocalStorage
        localStorage.removeItem(ACCESS)
        localStorage.removeItem(REFRESH)
    }

    return (
        <AuthContext.Provider
            value={{
                isLogged: state.isLogged,
                headers: state.headers,
                fileHeaders: state.fileHeaders,
                errors: state.errors,
                checkToken,
                doLogin,
                doLogout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}