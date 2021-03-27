import { Component } from 'react';
import { Link } from 'react-router-dom';
import Spiner from '../../components/spiner/Spiner';
import st from './HomePage.module.css';

import { getTrendingMovies, IMG_URL } from '../../Services/movieApi';

class HomePage extends Component {
  state = {
    movies: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    getTrendingMovies()
      .then(movies => {
        if (movies.length > 0) {
          this.setState(prevState => ({
            movies: [...prevState.movies, ...movies],
          }));
        }
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { movies, loading } = this.state;
    return (
      <>
        <h2 className={st.header}>Trending today</h2>
        {loading ? (
          <Spiner />
        ) : (
          <ul className={st.moviesList}>
            {movies.map(
              ({ id, poster_path, original_title, original_name }) => (
                <li className={st.moviesItem} key={id}>
                  <Link to={`movies/${id}`}>
                    <img
                      src={IMG_URL + poster_path}
                      alt={original_title || original_name}
                    />
                    <span className={st.movieTitle}>
                      {original_title || original_name}
                    </span>
                  </Link>
                </li>
              ),
            )}
          </ul>
        )}
      </>
    );
  }
}

export default HomePage;
