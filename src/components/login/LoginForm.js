import { useContext } from 'react';

// Material
import {
    Button,
    makeStyles,
    TextField
} from '@material-ui/core';

// Formik
import {useFormik} from 'formik';

// Yup Validations
import * as yup from 'yup';

// Context
import AuthContext from 'context/auth/authContext';


// Declaración de estilos
const useStyles = makeStyles( (theme) => ({
    formContainer: {
        flexDirection: 'column',
        display: 'flex',
        width: '100%',
        '& > *': {
            padding: `10px 0`
        }
    },

}))

// Form initial data
export const loginForm = {
    username: '',
    password: '',
}

// Validations
export const loginValidations = yup.object({
    username: yup
        .string('Enter an Email')
        // .email('Enter a valid email')
        .required('Username is required'),

})


export default function LoginForm() {
    // Inicializacion de clases
    const classes = useStyles()

    const authContext = useContext(AuthContext)
    const { doLogin } = authContext

    const formik = useFormik({
        // enableReinitialize: true,
        initialValues: loginForm,
        validationSchema: loginValidations,
        onSubmit: values => {
            doLogin(values)
        }
    })

    return (
        <form
            className={classes.formContainer}
            onSubmit={formik.handleSubmit}
        >

            <TextField
                type="text"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
            />

            <TextField
                type="text"
                name="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />


            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Login
            </Button>
        </form>
    )
}