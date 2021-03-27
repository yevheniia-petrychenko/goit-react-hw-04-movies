import { Component } from 'react';
import { getReview } from '../../Services/movieApi';
import Spiner from '../../components/spiner/Spiner';

class Reviews extends Component {
  state = {
    reviews: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    const movieId = this.props.extraPropName;

    getReview(movieId)
      .then(reviews => {
        if (reviews.length > 0) {
          this.setState(prevState => ({
            reviews: [...prevState.reviews, ...reviews],
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
    const { reviews, loading } = this.state;

    return (
      <>
        <h2>Reviews</h2>
        {loading ? (
          <Spiner />
        ) : reviews.length > 0 ? (
          <ul className="reviewsList">
            {reviews.map(({ author, content, id }) => (
              <li className="reviewsItem" key={id}>
                <p>{author}</p>
                <article>{content}</article>
              </li>
            ))}
          </ul>
        ) : (
          <p> There are no revievs </p>
        )}
      </>
    );
  }
}
export default Reviews;
