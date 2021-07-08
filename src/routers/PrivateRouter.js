import { useContext } from 'react';

// Router
import { Route, Redirect } from 'react-router-dom';

// Context
import AuthContext from 'context/auth/authContext';

// Custom Components
import Spinner from "components/shared/Spinner";

// Constants
import { LOGIN_LINK } from 'types/linkTypes';


export default function PrivateRouter( { children, ...rest } ) {

    const authContext = useContext(AuthContext)
    const { isLogged } = authContext

    if (isLogged === null) return <Spinner />
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLogged
                    ?
                    children
                    :
                    <Redirect
                        to={{
                            pathname: LOGIN_LINK,
                            state: { from: location }
                        }}
                    />

            }
        />
    )
}