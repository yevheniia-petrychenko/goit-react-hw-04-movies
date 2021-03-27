import { Component } from 'react';
import { getCast, IMG_URL } from '../../Services/movieApi';
import Spiner from '../../components/spiner/Spiner';
import st from './movieDetails.module.css';
import '../../img/notFound.jpg';

class Cast extends Component {
  state = {
    cast: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    const movieId = this.props.extraPropName;

    getCast(movieId)
      .then(cast => {
        if (cast.length > 0) {
          this.setState(prevState => ({
            cast: [...prevState.cast, ...cast],
          }));
        }
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(
        () => this.setState({ loading: false }),
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        }),
      );
  }

  render() {
    const { cast, loading } = this.state;
    console.log(loading);
    return (
      <>
        <h2>Cast</h2>
        {loading ? (
          <Spiner />
        ) : cast.length > 0 ? (
          <ul className={st.castList}>
            {cast.map(({ name, profile_path, character, cast_id }) => (
              <li className={st.castCharacter} key={cast_id}>
                <img
                  src={
                    IMG_URL + profile_path ===
                    'https://image.tmdb.org/t/p/w300/null'
                      ? process.env.PUBLIC_URL + '../../img/notFound.jpg'
                      : IMG_URL + profile_path
                  }
                  alt={name}
                  className={st.characterImg}
                />
                <p>{name}</p>
                <p>Character: {character}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p> There are no casts </p>
        )}
      </>
    );
  }
}
export default Cast;
