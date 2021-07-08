// React Router
import {Redirect, Route} from 'react-router-dom';

// Pages
import HomePage from 'pages/home/HomePage';

// Constants
import {BASE_LINK, HOME_LINK} from 'types/linkTypes';

export default function AppRouter() {
    return (
        <>
            <Route exact path={HOME_LINK}>
                <HomePage />
            </Route>

            {/*Si se quiere partir de una ruta inicial tipo /home/... o /dashboard/... se redirecciona la / a esa ruta*/}
            <Route exact path={BASE_LINK}>
                <Redirect to={HOME_LINK} />
            </Route>
            {/*Se pueden meter todos los links en un Array e inicializarlos juntos*/}
            {/*{*/}
            {/*    ALL_LINKS.map(itemRoute => (*/}
            {/*        <Route key={itemRoute.link} exact path={itemRoute.link}>*/}
            {/*            {itemRoute.component}*/}
            {/*        </Route>*/}
            {/*    ))*/}
            {/*}*/}
        </>
    )
}