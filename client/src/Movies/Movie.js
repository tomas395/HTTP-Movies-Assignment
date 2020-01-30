import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.res));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = (e, id) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log("deleteMovie works!", res);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("deleteMovie failed!", err);
      });
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div
          className="save-button"
          onClick={this.saveMovie}
          style={{ marginRight: "55px" }}
        >
          Save
        </div>
        <div className="save-button">
          <Link to={`/update-movie/${this.props.match.params.id}`}>Edit</Link>
        </div>
        <div
          className="save-button"
          onClick={e => {
            this.deleteMovie(e, this.props.match.params.id);
          }}
          style={{ marginRight: "120px" }}
        >
          Delete
        </div>
      </div>
    );
  }
}
