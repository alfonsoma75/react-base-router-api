
// Custom Components
import AppRouter from './AppRouter';
// import HeaderComponent from 'components/shared/header/HeaderComponent';


const InitialRouter = () => {


    return (
        <>
            {/*Si se quiere un header común para todas las páginas*/}
            <header>
                <h3>Header si se quiere</h3>
            {/*    <HeaderComponent/>*/}
            </header>

            <AppRouter />
        </>
    )
}

export default InitialRouter