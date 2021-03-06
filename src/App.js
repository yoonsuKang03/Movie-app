import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {

  // Render: componentWillMount() -> render() -> componentDidMount()
  // Update componentWillReceiveProps() -> shouldComponentUpdsate() -> componentWillUpdate() -> render() -> componentDidUpdate()

    state = {}

    componentDidMount(){ 
      this._getMovies();
    } //componentDidMount
  
    _renderMovies = () => { // _를 쓰는 이유는 리액트 자체 기능과 나의 기능에 차이를 두기 위해서이다 !
      const movies = this.state.movies.map(movie => {
        return <Movie 
        title={movie.title_english} 
        poster={movie.medium_cover_image} 
        key={movie.id} 
        genres={movie.genres}
        synopsis={movie.synopsis}
        />
      })
      return movies
    }

     _getMovies = async () => {
      const movies = await this._callApi()
      this.setState({
        movies
      })
    }

    _callApi = () => {
      return fetch("https://yts.am/api/v2/list_movies.json?sort_by=download_count")
      .then(potato => potato.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err))
    }

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    ); //return
  }//render
} //class

export default App;
