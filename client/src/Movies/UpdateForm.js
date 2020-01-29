import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateForm(props) {
  const { id } = props.match.params;
  const initialMovie = {
    id: Date.now(),
    title: "",
    director: "",
    metascore: "",
    stars: []
  };

  const [movie, setMovie] = useState(initialMovie);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`).then(res => {
      console.log("Movies GET Worked!", res.data);
      setMovie(res.data);
    });
  }, [id]);

  const handleChange = e => {
    console.log("HandleChange Worked!");

    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleStars = e => {
    setMovie({
      ...movie,
      stars: [e.target.value]
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log("Movie Fetched!", res);
        props.setMovie(initialMovie);
        props.history.push(`/movies/${id}`);
      })
      .catch(err => {
        console.log("Error: Put Request was not returned!", err);
      });
  };

  return (
    <div>
      <h2>Update Your Saved Movie Details</h2>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={movie.title}
          onChange={handleChange}
        />
        <label>Stars: </label>
        <input
          type="text"
          name="stars"
          placeholder="Stars"
          value={movie.stars}
          onChange={handleStars}
        />
        <label>Director: </label>
        <input
          type="text"
          placeholder="Director"
          name="director"
          value={movie.director}
          onChange={handleChange}
        />
        <label>Meta-Score: </label>
        <input
          type="text"
          placeholder="Meta-score"
          name="metascore"
          value={movie.metascore}
          onChange={handleChange}
        />

        <button type="submit">Update Movie Info</button>
      </form>
    </div>
  );
}
