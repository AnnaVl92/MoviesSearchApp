import React from 'react';
//import movies from '../../movies.json';
import FilmsList from '../films/filmsList.jsx';
import SearchInput from './searchInput.jsx';
import SearchButton from './searchButton.jsx';
import Radio from '../radio/radio.jsx';
import { connect } from "react-redux";
import { getMovies } from '../../actions';

class Search extends React.Component {
	state = {
		searchValue: '',
		// movies: [],
		filteredMovies: [],
		searchFilterValue: 'title',
		sortValue: '',
		sortedMovies: [],
		isSelectedMovie: false
	};

	// componentDidMount() {
	// 	this.setState({
	// 		movies: movies,
	// 		// filteredMovies: movies.data,
	// 		// sortedMovies: movies.data
	// 	});
	// }

	changeSearchFilter = e => {
		this.setState({searchFilterValue: e.target.value});
	}

	handleChange = e => {
		//this.props.handleChange();
		this.setState({searchValue: e.target.value});
	}

	handleSubmit = e => {
		//this.props.handleChange();
		e.preventDefault();
		console.log(this.state.sortValue);
		this.props.getMovies({ 
			sort : this.state.sortValue, 
			searchBy : this.state.searchFilterValue, 
			name : this.state.searchValue });
		// this.setState({
		// 	filteredMovies,
		// 	submitHandled: true
  //   	});
		return false;
	}

	chooseSort = e => {
		var sortValue = e.target.value;
		this.setState({sortValue: sortValue});
	}

	render() {
		const { movies, getMovies } = this.props;

		return (
			<React.Fragment>
				<form className="search" onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group row">
						<div className="col-lg-10">
							<SearchInput value={this.searchValue} onChange={(e) => this.handleChange(e)} />
						</div>
						<div className="col-lg-2">
							<SearchButton />
						</div>
					</div>
					<div className="d-flex justify-content-between">
						<div className="search-filter d-flex justify-content-between align-items-center form-group">
							SEARCH BY
							<Radio id="searchTitle" name="searchFilter" value="title" onChange={this.changeSearchFilter} labelText="TITLE" isDefaultChecked />
							<Radio id="searchGenre" name="searchFilter" value="genre" onChange={this.changeSearchFilter} labelText="GENRE" />
						</div>
						<div className="sort d-flex align-items-start justify-content-between">
							Sort by
							<Radio id="sortReleaseDate" name="sort" value="releaseDate" onChange={this.chooseSort} labelText="release date" />
							<Radio id="sortRating" name="sort" value="rating" onChange={this.chooseSort} labelText="rating" />
						</div>
					</div>
				</form>
				<div className="results">{movies.length} movies found</div>
				<FilmsList movies={movies} />
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		movies: state.movies,
	};
};

const mapDispatchToProps = {
	getMovies: getMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);