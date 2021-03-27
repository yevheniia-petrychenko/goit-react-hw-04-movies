import { Component, lazy, Suspense } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import { getMovieDetails, IMG_URL } from '../../Services/movieApi';
import Spiner from '../../components/spiner/Spiner';
import st from './MovieDetailsPage.module.css';
import '../../img/notFound.jpg';

const Cast = lazy(() => import('../../components/MovieDetailsPage/Cast'));

const Reviews = lazy(() => import('../../components/MovieDetailsPage/Reviews'));

class MovieDetailsPage extends Component {
  state = {
    movie: {
      poster_path: null,
      original_title: null,
      original_name: null,
      release_date: null,
      vote_average: null,
      overview: null,
      genres: [],
    },
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    const movieId = this.props.match.params.movieId;

    getMovieDetails(movieId)
      .then(movie => {
        if (movie !== null) {
          this.setState({ movie });
        }
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(() => this.setState({ loading: false }));
  }

  handleClickBack = () => {
    const { location, history } = this.props;
    history.push(location?.state?.from || '/');
  };

  render() {
    const { location } = this.props;
    const { loading, movie } = this.state;
    const isEmpty = (movie.original_title || movie.original_name) === null;
    console.log(movie);

    return (
      <>
        {loading ? (
          <Spiner />
        ) : (
          <div className={st.card}>
            <button className={st.backBtn} onClick={this.handleClickBack}>
              <span>Go Back</span>
            </button>
            {isEmpty ? (
              <p>Sorry, we have no info about movie</p>
            ) : (
              <div>
                <div className={st.cardDescription}>
                  <img
                    className={st.MoviePoster}
                    src={
                      IMG_URL + this.state.movie.poster_path ===
                      'https://image.tmdb.org/t/p/w300/null'
                        ? process.env.PUBLIC_URL + '../../img/notFound.jpg'
                        : IMG_URL + this.state.movie.poster_path
                    }
                    alt={movie.origrnal_title || movie.original_name}
                  />
                  <div>
                    <h2>{movie.original_title || movie.original_name}</h2>
                    <span>({movie.release_date})</span>
                    <h3>User score: {movie.vote_average * 10}%</h3>
                    <h3>Overview: </h3>
                    <span className="overview">{movie.overview}</span>
                    <h3 className="title">Genres</h3>
                    <ul className={st.genresList}>
                      {this.state.movie.genres.map(genre => (
                        <li className={st.genre} key={genre.id}>
                          {genre.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <h2 className={st.title}>Additional information</h2>
                <ul className={st.list}>
                  <li>
                    <NavLink
                      className={st.link}
                      to={{
                        pathname: `/movies/${this.state.movie.id}/cast`,
                        state: { ...location.state },
                      }}
                    >
                      Cast
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={st.link}
                      to={{
                        pathname: `/movies/${this.state.movie.id}/reviews`,
                        state: { ...location.state },
                      }}
                    >
                      Reviews
                    </NavLink>
                  </li>
                </ul>
                <Suspense fallback={<div>Loading...</div>}>
                  <Switch>
                    <Route
                      exact
                      path={`/movies/${this.state.movie.id}/cast`}
                      render={props => (
                        <Cast {...props} extraPropName={this.state.movie.id} />
                      )}
                    ></Route>
                    <Route
                      exact
                      path={`/movies/${this.state.movie.id}/reviews`}
                      render={props => (
                        <Reviews
                          {...props}
                          extraPropName={this.state.movie.id}
                        />
                      )}
                    ></Route>
                  </Switch>
                </Suspense>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}

export default MovieDetailsPage;
