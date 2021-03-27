import './App.css';
import './styles/styles.css';
import { Route, NavLink, Switch } from 'react-router-dom';
import HomePage from './views/HomePage/HomePage';
import MoviesPage from './views/MoviesPage/MoviesPage';
import MovieDetailsPage from './views/MovieDetailsPage/MovieDetailsPage';

const App = () => (
  <>
    <nav className="Navigation">
      <NavLink exact to="/" className="NavLink" activeClassName="NavLinkActive">
        Home
      </NavLink>

      <NavLink to="/movies" className="NavLink" activeClassName="NavLinkActive">
        Movies
      </NavLink>
    </nav>
    <Switch>
      <Route exact path="/" component={HomePage} />;
      <Route path="/movies/:movieId" component={MovieDetailsPage} />;
      <Route exact path="/movies" component={MoviesPage} />;
      <Route component={HomePage} />
    </Switch>
  </>
);

export default App;
