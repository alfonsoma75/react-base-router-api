// Router
import {Switch, Route} from 'react-router-dom';

// State
import BaseState from 'context/base/baseState';
// import ServicesState from 'context/services/servicesState';
import AuthState from 'context/auth/authState';

// Routers
import HomeRouter from 'routers/HomeRouter';

// Custom Components
import LoginPage from 'pages/login/LoginPage';


// Constants
import {
    BASE_LINK, LOGIN_LINK,

} from 'types/linkTypes';

function App() {
  return (
      <AuthState>
      <BaseState>


                <Switch>

                  <Route exact path={LOGIN_LINK}>
                    <LoginPage />
                  </Route>

                  <Route path={BASE_LINK}>
                    <HomeRouter />
                  </Route>

                </Switch>

        </BaseState>

    </AuthState>
  )
}

export default App;
