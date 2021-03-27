import { Component } from 'react';
import { Link } from 'react-router-dom';
import Spiner from '../../components/spiner/Spiner';
import { getMovieQuery, IMG_URL } from '../../Services/movieApi';
import st from './moviesPage.module.css';

class MoviesPage extends Component {
  static propTypes = {};
  А;
  static defaultProps = {};

  state = {
    movies: [],
    loading: false,
    error: null,
    value: '',
  };

  componentDidMount() {
    const query = this.props.location.search;
    //console.log(this.props);
    if (query) {
      this.getMovies(query);
    }
  }

  componentDidUpdate(prevProps) {
    const { query: prevQuery } = prevProps.location.search;
    const { query: nextQuery } = this.props.location.search;

    if (prevQuery !== nextQuery) {
      this.getMovies(nextQuery);
    }
  }

  getMovies = query => {
    this.setState({ loading: true });
    getMovieQuery(query)
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
  };

  handleOnSubmit = query => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  handleChange = event => {
    this.setState({ value: event.currentTarget.value.toLowerCase() });
  };

  render() {
    const { movies, loading, value } = this.state;
    return (
      <div>
        <>
          <form onSubmit={this.handleOnSubmit} className={st.searchForm}>
            <input
              className={st.input}
              type="text"
              name="query"
              value={value}
              autoFocus
              onChange={this.handleChange}
            />
            <button type="submit" className={st.searchButton}>
              Search
            </button>
          </form>
        </>
        {loading ? (
          <Spiner />
        ) : (
          <ul className={st.moviesList}>
            {movies.map(
              ({ id, poster_path, original_title, original_name }) => (
                <li key={id} className={st.moviesItem}>
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
      </div>
    );
  }
}
export default MoviesPage;
