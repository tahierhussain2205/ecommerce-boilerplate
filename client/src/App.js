import { Route, Switch } from 'react-router-dom';
import AdminLoginPage from './pages/AdminLogin';
import HomePage from './pages/Home';

function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/login' exact>
          <AdminLoginPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
