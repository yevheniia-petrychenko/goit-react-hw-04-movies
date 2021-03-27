import { Component } from 'react';

class SearchBar extends Component {
  state = {
    value: '',
  };

  handleSubmit = event => {
    const { value } = this.state;
    //event.preventDefault();
    //console.log(this.state);

    if (value === '') {
      <h1 className="ErrorMessage">Type a film title</h1>;
      return;
    }

    //this.props.onSubmit(value);
    //this.setState({ value: '' });
  };

  handleChange = event => {
    //console.log(event);
    this.setState({ value: event.currentTarget.value.toLowerCase() });
  };

  render() {
    const { value } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit} className="serachForm">
          <input
            type="text"
            name="query"
            value={value}
            autoFocus
            onChange={this.handleChange}
          />
          <button type="submit" className="searchButton">
            Search
          </button>
        </form>
      </>
    );
  }
}

export default SearchBar;
