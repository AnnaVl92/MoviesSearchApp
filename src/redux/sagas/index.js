import { takeLatest, all, put, take } from "redux-saga/effects";
import { getMovies, getMovieId, getMoviesBySimilarGenre } from '../actions';
import { REHYDRATE } from 'redux-persist/lib/constants';

function* fetchMovies(params) {
	params = params.params && params.params;
	const json = yield fetch(`https://reactjs-cdp.herokuapp.com/movies?sortBy=${params.sortBy}&sortOrder=${params.sortOrder}&search=${params.name}&searchBy=${params.searchBy}`)
		.then(response => response.json(), );
	yield put({ type: "MOVIES_RECEIVED", json: json.data, });
};

function* actionWatcher() {
	yield takeLatest('GET_MOVIES', fetchMovies)
};

function* fetchMovieById(payload) {
	payload = payload.payload && payload.payload;
	const json = yield fetch(`https://reactjs-cdp.herokuapp.com/movies/${payload}`)
		.then(response => response.json(), );

	yield put({ type: "MOVIE_BY_ID_RECEIVED", json: json });
};

function* actionIdWatcher() {
	yield takeLatest('GET_MOVIE_BY_ID', fetchMovieById)
};

function* fetchMoviesBySimilarGenre(params) {
	params = params.params && params.params;
	const json = yield fetch(`https://reactjs-cdp.herokuapp.com/movies?searchBy=${params.searchBy}&filter=${params.filter}`)
		.then(response => response.json(), );
	yield put({ type: "MOVIES_BY_SIMILAR_GENRE_RECEIVED", json: json.data, });
};

function* actionSimilarGenreWatcher() {
	yield takeLatest('GET_MOVIES_BY_SIMILAR_GENRE', fetchMoviesBySimilarGenre)
};

export default function* rootSaga() {
	// yield take(REHYDRATE);
	// console.log("Rehydrated")
	yield all([
		// fetchMovies({params: { sort : 'desc', searchBy : 'title', name : '' }}),
		actionWatcher(),
		// fetchMovieById({payload: { id: null }}),
		actionIdWatcher(),
		// fetchMoviesBySimilarGenre({params: { searchBy : 'genres', filter : '' }}),
		actionSimilarGenreWatcher()
	]);
}