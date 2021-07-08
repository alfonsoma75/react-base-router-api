import { useEffect, useContext } from 'react';

// Router
import { useHistory } from 'react-router-dom';

// Material
import {
    Grid,
    makeStyles
} from '@material-ui/core';

// Context
import AuthContext from "context/auth/authContext";

// Custom Components
import LoginForm from "components/login/LoginForm";


const useStyles = makeStyles( (theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))


export default function LoginPage() {
    const history = useHistory()
    // Inicialización de estilos
    const classes = useStyles()

    const authContext = useContext(AuthContext)
    const { isLogged } = authContext

    useEffect( () => {
        if (isLogged) {
            history.push('/')
        }
    }, [isLogged])

    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            style={{width: '100%', height: '100vh'}}
        >
            <Grid
                item
                xs={12}
            >
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                >
                    <Grid
                        item
                        xs={10}
                        sm={8}
                        md={4}
                        lg={3}
                        className={classes.container}
                    >
                        <LoginForm />
                    </Grid>

                </Grid>
            </Grid>

        </Grid>
    )
}
