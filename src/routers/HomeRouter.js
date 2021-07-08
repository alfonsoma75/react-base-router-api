import {useContext, useEffect} from "react";
// Context
import AuthContext from 'context/auth/authContext';

// Custom Routers
import PrivateRouter from './PrivateRouter';
import InitialRouter from './InitialRouter';

export default function HomeRouter() {

    const authContext = useContext(AuthContext)
    const { checkToken } = authContext

    useEffect(() => {
        checkToken()
    }, [])

    return (

        <PrivateRouter>
            <InitialRouter />
        </PrivateRouter>

    )
}